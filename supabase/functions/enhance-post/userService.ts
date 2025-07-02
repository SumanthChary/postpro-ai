
export async function getUserPlanAndPostCount(userId: string) {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return { plan: 'Starter Plan', postCount: 0 };
    }

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.48.1');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: subscription, error } = await supabase
      .from('subscribers')
      .select('plan_name, monthly_post_count')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching subscription:', error);
      return { plan: 'Starter Plan', postCount: 0 };
    }

    return { 
      plan: subscription?.plan_name || 'Starter Plan', 
      postCount: subscription?.monthly_post_count || 0 
    };
  } catch (error) {
    console.error('Error in getUserPlanAndPostCount:', error);
    return { plan: 'Starter Plan', postCount: 0 };
  }
}

export async function fetchUserPlanFromDatabase(userId: string) {
  const { plan } = await getUserPlanAndPostCount(userId);
  return plan;
}

export async function getUserPlanFeatures(userId: string, email: string) {
  const creatorEmails = ['enjoywithpandu@gmail.com'];

  if (creatorEmails.includes(email)) {
    return {
      maxPosts: Infinity,
      accessTemplates: true,
      accessViralityTips: true,
      accessAdvancedAI: true,
      allFeatures: true,
      unlimited: true,
    };
  }

  const userPlan = await fetchUserPlanFromDatabase(userId);
  const planFeatures = {
    'Starter Plan': { maxPosts: 5, accessTemplates: false, accessViralityTips: false, accessAdvancedAI: false },
    'Monthly Plan': { maxPosts: Infinity, accessTemplates: true, accessViralityTips: true, accessAdvancedAI: true },
    'Yearly Plan': { maxPosts: Infinity, accessTemplates: true, accessViralityTips: true, accessAdvancedAI: true },
    'Enterprise Plan': { maxPosts: Infinity, accessTemplates: true, accessViralityTips: true, accessAdvancedAI: true }
  };
  
  return planFeatures[userPlan as keyof typeof planFeatures] || planFeatures['Starter Plan'];
}

export async function incrementPostCount(userId: string) {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return;
    }

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.48.1');
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase
      .from('subscribers')
      .update({ monthly_post_count: supabase.sql`monthly_post_count + 1` })
      .eq('user_id', userId);

    console.log(`Incremented post count for user: ${userId}`);
  } catch (error) {
    console.error('Error incrementing post count:', error);
  }
}

export async function checkUserPlanLimits(userId: string) {
  if (!userId) {
    return; // Anonymous users can still use the service but with limitations
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return;
    }

    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.48.1');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user's subscription info with limits
    const { data: subscription, error: subError } = await supabase
      .from('subscribers')
      .select(`
        plan_name, 
        monthly_post_count, 
        monthly_reset_date, 
        subscription_end,
        subscription_limits (monthly_post_limit)
      `)
      .eq('user_id', userId)
      .maybeSingle();

    if (subError) {
      console.error('Error fetching subscription:', subError);
      return; // Don't block if we can't check
    }

    // If no subscription exists, create a starter plan subscription
    if (!subscription) {
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{
          user_id: userId,
          plan_name: 'Starter Plan',
          subscribed: true,
          monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }]);

      if (insertError) {
        console.error('Error creating subscription:', insertError);
      }
      return; // New user, allow usage
    }

    // Check if subscription is still active
    if (subscription.subscription_end && new Date() > new Date(subscription.subscription_end)) {
      throw new Error('Subscription has expired. Please renew your subscription to continue.');
    }

    // Reset monthly count if it's a new month
    const now = new Date();
    const resetDate = new Date(subscription.monthly_reset_date || now);
    
    if (now > resetDate) {
      await supabase
        .from('subscribers')
        .update({
          monthly_post_count: 0,
          monthly_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })
        .eq('user_id', userId);
      
      subscription.monthly_post_count = 0;
    }

    // Check if user has reached their limit
    const monthlyLimit = subscription.subscription_limits?.monthly_post_limit || 5;
    const currentCount = subscription.monthly_post_count || 0;

    console.log(`User plan: ${subscription.plan_name}, postCount: ${currentCount}, maxPosts: ${monthlyLimit}`);

    if (monthlyLimit !== -1 && currentCount >= monthlyLimit) {
      throw new Error(`Post limit reached. You have used ${currentCount}/${monthlyLimit} enhancements this month. Upgrade your plan for unlimited enhancements.`);
    }

  } catch (error: any) {
    console.error('Error in checkUserPlanLimits:', error);
    throw error;
  }
}
