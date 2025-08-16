import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Crown, Zap } from 'lucide-react';
import { useWhopAuth } from '@/hooks/useWhopAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WhopPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  whopProductId?: string;
}

const WHOP_PLANS: WhopPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: 'USD',
    interval: 'month',
    features: [
      '10 post enhancements per month',
      'Basic templates',
      'Community support',
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 19,
    currency: 'USD',
    interval: 'month',
    popular: true,
    whopProductId: 'prod_creator_monthly',
    features: [
      '500 post enhancements per month',
      'Premium templates',
      'Virality score analysis',
      'Priority support',
      'Multiple platforms',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Community',
    price: 39,
    currency: 'USD',
    interval: 'month',
    whopProductId: 'prod_pro_monthly',
    features: [
      'Unlimited post enhancements',
      'Advanced AI models',
      'Custom templates',
      'A/B testing',
      'Analytics dashboard',
      'White-label options',
      'Dedicated support',
    ],
  },
];

interface WhopPaymentButtonProps {
  plan: WhopPlan;
  className?: string;
}

export const WhopPaymentButton: React.FC<WhopPaymentButtonProps> = ({ 
  plan, 
  className 
}) => {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useWhopAuth();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: 'Authentication Required',
        description: 'Please authenticate with Whop first.',
        variant: 'destructive',
      });
      return;
    }

    if (plan.price === 0) {
      toast({
        title: 'Free Plan',
        description: 'You are already on the free plan!',
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('whop-api', {
        body: {
          action: 'createPayment',
          data: {
            product_id: plan.whopProductId,
            user_id: user.id,
            plan_name: plan.name,
            amount: plan.price * 100, // Convert to cents
            currency: plan.currency.toLowerCase(),
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data?.success && data.data?.checkout_url) {
        // Redirect to Whop checkout
        if (window.parent !== window) {
          // If in iframe, use postMessage
          window.parent.postMessage({
            type: 'whop_checkout',
            url: data.data.checkout_url,
          }, '*');
        } else {
          window.open(data.data.checkout_url, '_blank');
        }

        toast({
          title: 'Redirecting to Checkout',
          description: 'Please complete your payment on Whop.',
        });
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      toast({
        title: 'Payment Failed',
        description: 'Failed to create payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading || !isAuthenticated}
      className={className}
      size="lg"
    >
      {loading ? 'Processing...' : `Subscribe for $${plan.price}/${plan.interval}`}
    </Button>
  );
};

export const WhopPricingCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {WHOP_PLANS.map((plan) => (
        <Card 
          key={plan.id} 
          className={`relative transition-all duration-300 hover:shadow-lg ${
            plan.popular ? 'border-primary shadow-md scale-105' : ''
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
              <Crown className="h-3 w-3 mr-1" />
              Most Popular
            </Badge>
          )}
          
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
            <div className="mt-2">
              {plan.price === 0 ? (
                <span className="text-3xl font-bold text-green-600">Free</span>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <WhopPaymentButton 
              plan={plan} 
              className="w-full mt-6" 
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};