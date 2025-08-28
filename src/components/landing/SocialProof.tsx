import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, MessageCircle, Heart } from 'lucide-react';

const SocialProof = () => {
  const metrics = [
    {
      icon: <Users className="w-4 h-4" />,
      value: "500+",
      label: "Active Users",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      value: "50K+",
      label: "Posts Enhanced",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      value: "340%",
      label: "Avg Engagement Boost",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: <Heart className="w-4 h-4" />,
      value: "4.9/5",
      label: "User Rating",
      color: "bg-pink-100 text-pink-700"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
      {metrics.map((metric, index) => (
        <Badge key={index} className={`${metric.color} border-0 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium`}>
          <span className="flex items-center gap-1.5">
            {metric.icon}
            <span className="font-bold">{metric.value}</span>
            <span className="hidden sm:inline">{metric.label}</span>
          </span>
        </Badge>
      ))}
    </div>
  );
};

export default SocialProof;