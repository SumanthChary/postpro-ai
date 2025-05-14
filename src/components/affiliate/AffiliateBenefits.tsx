
import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUpIcon, LinkIcon, UsersIcon, BarChartIcon } from 'lucide-react';

const AffiliateBenefits = () => {
  const benefits = [
    {
      icon: TrendingUpIcon,
      title: "25% Lifetime Commission",
      description: "Earn recurring revenue from all payments made by your referrals, forever.",
      bgColor: "bg-electric-purple/10",
      textColor: "text-electric-purple"
    },
    {
      icon: LinkIcon,
      title: "Easy Tracking",
      description: "Simple dashboard to track clicks, referrals, and earnings in one place.",
      bgColor: "bg-bright-teal/10",
      textColor: "text-bright-teal"
    },
    {
      icon: UsersIcon,
      title: "Extended Cookie Period",
      description: "90-day cookie window ensures you get credit even if users sign up later.",
      bgColor: "bg-electric-purple/10",
      textColor: "text-electric-purple"
    },
    {
      icon: BarChartIcon,
      title: "Monthly Payouts",
      description: "Get paid reliably every month via PayPal or bank transfer when you reach $50.",
      bgColor: "bg-bright-teal/10",
      textColor: "text-bright-teal"
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
      <h2 className="text-3xl font-bold text-center mb-8">Affiliate Program Benefits</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`${benefit.bgColor} p-2 rounded-full`}>
              <benefit.icon className={`w-5 h-5 ${benefit.textColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
              <p className="text-custom-text">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateBenefits;
