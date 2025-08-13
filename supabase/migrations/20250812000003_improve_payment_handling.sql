-- Add transaction handling and validation for payments
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
  -- Start transaction
  BEGIN
    -- Validate inputs
    IF p_amount <= 0 THEN
      RAISE EXCEPTION 'Invalid payment amount';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
      RAISE EXCEPTION 'Invalid user ID';
    END IF;

    -- Check for duplicate transaction
    IF EXISTS (SELECT 1 FROM payments WHERE transaction_id = p_transaction_id) THEN
      RAISE EXCEPTION 'Duplicate transaction';
    END IF;

    -- Record payment
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

    -- Update subscription if applicable
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

    -- Add credits if applicable
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

    -- Create success response
    v_result = json_build_object(
      'success', true,
      'message', 'Payment processed successfully',
      'transaction_id', p_transaction_id
    );

    -- Commit transaction
    RETURN v_result;
  EXCEPTION
    WHEN OTHERS THEN
      -- Rollback transaction on error
      RAISE NOTICE 'Error processing payment: %', SQLERRM;
      RETURN json_build_object(
        'success', false,
        'error', SQLERRM
      );
  END;
END;
$$;
