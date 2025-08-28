import { Shield, Lock, Award, Users, Clock, CheckCircle } from "lucide-react";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  showCount?: boolean;
}

const TrustBadges = ({ variant = "horizontal", showCount = true }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Shield,
      text: "SSL Secure",
      subtext: "256-bit encryption"
    },
    {
      icon: Lock,
      text: "Privacy Protected", 
      subtext: "GDPR compliant"
    },
    {
      icon: Award,
      text: "Money-Back Guarantee",
      subtext: "30 days, no questions"
    },
    {
      icon: Users,
      text: showCount ? "47+ Creators" : "Creator Trusted",
      subtext: "Growing community"
    }
  ];

  if (variant === "compact") {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {badges.slice(0, 3).map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <badge.icon className="w-4 h-4 text-green-600" />
            <span className="font-medium">{badge.text}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="space-y-4">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <badge.icon className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">{badge.text}</div>
              <div className="text-xs text-gray-600">{badge.subtext}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-center gap-2">
          <badge.icon className="w-5 h-5 text-green-600" />
          <div className="text-center">
            <div className="font-semibold text-gray-900 text-sm">{badge.text}</div>
            <div className="text-xs text-gray-600">{badge.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;