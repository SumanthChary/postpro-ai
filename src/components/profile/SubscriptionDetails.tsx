import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Crown, Calendar, CreditCard, Settings } from 'lucide-react';

interface SubscriptionDetailsProps {
  plan: {
    name: string;
    price: number;
    period: string;
    features: string[];
    creditsUsed: number;
    totalCredits: number;
    nextBillingDate: string;
  };
}

export const SubscriptionDetails = ({ plan }: SubscriptionDetailsProps) => {
  return (
    <div className="space-y-8">
      {/* Current Plan Card */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Crown className="w-5 h-5 text-blue-600" />
                {plan.name}
              </h3>
              <p className="text-gray-600 mt-1">
                ${plan.price}/{plan.period}
              </p>
            </div>
            <Button variant="outline" className="hover:bg-blue-50">
              Manage Plan
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Credits Used</span>
                <span className="font-medium">{plan.creditsUsed}/{plan.totalCredits}</span>
              </div>
              <Progress value={(plan.creditsUsed / plan.totalCredits) * 100} />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              Next billing date: {plan.nextBillingDate}
            </div>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <Card className="p-6 bg-white/90 backdrop-blur-sm border-gray-200/50">
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Payment Method
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/card-visa.svg" alt="Visa" className="h-8" />
              <div>
                <div className="font-medium">•••• 4242</div>
                <div className="text-sm text-gray-500">Expires 12/25</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          <Settings className="w-4 h-4 mr-2" />
          Account Settings
        </Button>
        <Button variant="outline" className="flex-1">
          <Shield className="w-4 h-4 mr-2" />
          Security
        </Button>
      </div>
    </div>
  );
};
