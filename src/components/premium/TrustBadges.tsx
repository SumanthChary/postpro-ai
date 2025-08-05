import { Shield, Award, Users, Zap, Lock, CheckCircle } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "SSL Secured",
      description: "Bank-level encryption"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "2,847+ Creators",
      description: "Trust our platform"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Microsoft & Google",
      description: "Teams use our tools"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "99.9% Uptime",
      description: "Reliable service"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "GDPR Compliant",
      description: "Privacy protected"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "30-Day Guarantee",
      description: "Risk-free trial"
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-gray-600">
            Join thousands of professionals who trust our platform
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center text-blue-600 mb-2">
                {badge.icon}
              </div>
              <h4 className="font-semibold text-sm text-gray-900 mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-gray-600">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <span className="text-green-600">★★★★★</span>
              <span className="font-medium">4.9/5</span>
            </span>
            <span>•</span>
            <span>2,100+ reviews</span>
            <span>•</span>
            <span>Featured in TechCrunch, Forbes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;