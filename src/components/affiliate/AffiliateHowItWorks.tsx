
import React from 'react';
import { Card } from "@/components/ui/card";

const AffiliateHowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Share Your Link",
      description: "Copy your unique referral link and share it on social media, email, or your website.",
      borderColor: "border-electric-purple",
      textColor: "text-electric-purple"
    },
    {
      number: 2,
      title: "Users Sign Up",
      description: "When someone clicks your link and signs up, they're tracked as your referral forever.",
      borderColor: "border-bright-teal",
      textColor: "text-bright-teal"
    },
    {
      number: 3,
      title: "Earn Commission",
      description: "You earn 25% commission every time your referral makes a payment - for life!",
      borderColor: "border-electric-purple",
      textColor: "text-electric-purple"
    }
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className={`p-6 shadow-lg border-t-4 ${step.borderColor}`}>
            <div className={`font-bold text-3xl ${step.textColor} mb-4`}>{step.number}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-custom-text">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AffiliateHowItWorks;
