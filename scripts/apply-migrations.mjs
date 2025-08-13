import pkg from '@supabase/supabase-js';
const { createClient } = pkg;

const supabaseUrl = 'https://rskzizedzagohmvyhuyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza3ppemVkemFnb2htdnlodXl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzAzODc3OSwiZXhwIjoyMDUyNjE0Nzc5fQ.c8XlDIGEzrj6rTw09o8fYFpX80mhTdDQVN2-EmVGBsk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSQL(sql) {
  const { data, error } = await supabase.rpc('run_sql', { sql });
  if (error) throw error;
  return data;
}

async function applyMigrations() {
  try {
    // First create the run_sql function if it doesn't exist
    await runSQL(`
      CREATE OR REPLACE FUNCTION run_sql(sql text) 
      RETURNS void 
      LANGUAGE plpgsql 
      SECURITY DEFINER 
      AS $$
      BEGIN
        EXECUTE sql;
      END;
      $$;
    `);

    const migrations = [
      ['Adding indices', `
        CREATE INDEX IF NOT EXISTS idx_subscribers_user_id ON public.subscribers(user_id);
        CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);
        CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_credits_expires_at ON public.user_credits(expires_at);
        CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON public.user_usage(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_credits_user_balance_expiry ON public.user_credits(user_id, balance) WHERE balance > 0;
        CREATE INDEX IF NOT EXISTS idx_subscribers_user_reset ON public.subscribers(user_id, monthly_reset_date);
      `],
      ['Adding subscription expiration handler', `
        CREATE OR REPLACE FUNCTION handle_expired_subscriptions()
        RETURNS void
        LANGUAGE plpgsql
        SECURITY DEFINER
        SET search_path = public
        AS $$
        BEGIN
          UPDATE public.subscribers
          SET plan_name = 'Free Plan',
              subscribed = false,
              subscription_tier = NULL,
              monthly_post_count = 0,
              monthly_reset_date = date_trunc('month', now()) + interval '1 month'
          WHERE subscription_end < now() AND plan_name != 'Free Plan';
        END;
        $$;
      `],
      ['Improving credit handling', `
        ALTER TABLE public.user_credits
        ADD CONSTRAINT IF NOT EXISTS positive_balance CHECK (balance >= 0),
        ADD CONSTRAINT IF NOT EXISTS valid_expiry CHECK (expires_at > created_at);

        CREATE OR REPLACE FUNCTION cleanup_expired_credits()
        RETURNS void
        LANGUAGE plpgsql
        SECURITY DEFINER
        SET search_path = public
        AS $$
        BEGIN
          WITH expired_credits AS (
            DELETE FROM public.user_credits
            WHERE expires_at < now() AND balance > 0
            RETURNING user_id, balance
          )
          INSERT INTO public.credit_history (user_id, amount, action, reason)
          SELECT user_id, balance, 'expired', 'Credits expired'
          FROM expired_credits;
        END;
        $$;
      `],
      ['Adding payment handling improvements', `
        CREATE OR REPLACE FUNCTION process_payment(
          p_user_id UUID,
          p_amount DECIMAL,
          p_currency TEXT,
          p_payment_method TEXT,
          p_transaction_id TEXT,
          p_subscription_tier TEXT,
          p_credits INTEGER DEFAULT NULL
        )
        RETURNS JSON
        LANGUAGE plpgsql
        SECURITY DEFINER
        SET search_path = public
        AS $$
        DECLARE
          v_result JSON;
        BEGIN
          IF p_amount <= 0 THEN
            RAISE EXCEPTION 'Invalid payment amount';
          END IF;

          IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
            RAISE EXCEPTION 'Invalid user ID';
          END IF;

          IF EXISTS (SELECT 1 FROM payments WHERE transaction_id = p_transaction_id) THEN
            RAISE EXCEPTION 'Duplicate transaction';
          END IF;

          INSERT INTO payments (
            user_id,
            amount,
            currency,
            payment_method,
            status,
            transaction_id,
            subscription_tier
          ) VALUES (
            p_user_id,
            p_amount,
            p_currency,
            p_payment_method,
            'completed',
            p_transaction_id,
            p_subscription_tier
          );

          IF p_subscription_tier IS NOT NULL THEN
            INSERT INTO subscribers (
              user_id,
              email,
              plan_name,
              subscription_tier,
              subscribed,
              subscription_end,
              monthly_reset_date,
              monthly_post_count
            )
            SELECT 
              p_user_id,
              users.email,
              p_subscription_tier,
              p_subscription_tier,
              true,
              CASE 
                WHEN p_subscription_tier LIKE '%Yearly%' THEN now() + interval '1 year'
                ELSE now() + interval '1 month'
              END,
              now() + interval '30 days',
              0
            FROM auth.users
            WHERE id = p_user_id
            ON CONFLICT (user_id) DO UPDATE
            SET 
              plan_name = EXCLUDED.plan_name,
              subscription_tier = EXCLUDED.subscription_tier,
              subscribed = EXCLUDED.subscribed,
              subscription_end = EXCLUDED.subscription_end,
              monthly_reset_date = EXCLUDED.monthly_reset_date,
              monthly_post_count = EXCLUDED.monthly_post_count;
          END IF;

          IF p_credits IS NOT NULL AND p_credits > 0 THEN
            INSERT INTO user_credits (
              user_id,
              balance,
              expires_at
            ) VALUES (
              p_user_id,
              p_credits,
              CASE 
                WHEN p_subscription_tier LIKE '%Yearly%' THEN now() + interval '1 year'
                ELSE now() + interval '3 months'
              END
            );
          END IF;

          v_result = json_build_object(
            'success', true,
            'message', 'Payment processed successfully',
            'transaction_id', p_transaction_id
          );

          RETURN v_result;
        EXCEPTION
          WHEN OTHERS THEN
            RETURN json_build_object(
              'success', false,
              'error', SQLERRM
            );
        END;
        $$;
      `]
    ];

    for (const [description, sql] of migrations) {
      console.log(`Applying migration: ${description}`);
      await runSQL(sql);
      console.log(`Successfully applied migration: ${description}`);
    }

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  }
}

applyMigrations().catch(console.error);
