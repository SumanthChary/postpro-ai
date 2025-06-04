
import { Card } from "@/components/ui/card";
import { FileTextIcon, RocketIcon, LockIcon, Sparkles, Crown } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

interface TemplatesSectionProps {
  handleProTemplatesClick: () => void;
}

const TemplatesSection = ({ handleProTemplatesClick }: TemplatesSectionProps) => {
  const { user } = useAuth();
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const userPlan = user?.plan || 'free';
      setIsProUser(userPlan === 'weekly' || userPlan === 'monthly' || userPlan === 'yearly' || userPlan === 'enterprise');
    };

    fetchUserPlan();
  }, [user]);

  return (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl" style={{ backgroundColor: 'rgba(57,107,255,0.1)' }}>
              <Sparkles className="w-8 h-8" style={{ color: 'rgba(57,107,255,1)' }} />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
              Content Templates
            </h2>
          </div>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Professional templates designed to elevate your social media content
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Basic Templates Card */}
          <Card className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 rounded-2xl bg-green-100 group-hover:scale-110 transition-transform duration-300">
                  <FileTextIcon className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Basic Templates</h3>
                  <p className="text-green-600 font-medium">Free Access</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Essential templates for everyday social media posts. Perfect for getting started with professional content creation.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <span>LinkedIn post templates</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <span>Twitter thread starters</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                  <span>Instagram captions</span>
                </div>
              </div>
              
              <a 
                href="https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg group-hover:scale-105"
                style={{ backgroundColor: 'rgba(57,107,255,1)' }}
              >
                View Templates
                <RocketIcon className="w-5 h-5 ml-2" />
              </a>
            </div>
          </Card>

          {/* Pro Templates Card */}
          {isProUser ? (
            <Card className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: 'rgba(57,107,255,1)' }}>
                PRO
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <Crown className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro Templates</h3>
                    <p className="text-purple-600 font-medium">Premium Access</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Advanced templates with proven frameworks for maximum engagement and conversion optimization.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span>Viral content frameworks</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span>Sales funnel templates</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span>Thought leadership posts</span>
                  </div>
                </div>
                
                <a 
                  href="https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg group-hover:scale-105"
                >
                  Access Pro Templates
                  <RocketIcon className="w-5 h-5 ml-2" />
                </a>
              </div>
            </Card>
          ) : (
            <Card className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-white/90 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-full bg-white shadow-lg mx-auto w-fit">
                    <LockIcon className="w-8 h-8" style={{ color: 'rgba(57,107,255,1)' }} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Pro</h4>
                    <p className="text-gray-600 mb-4">Unlock premium templates</p>
                    <button 
                      onClick={handleProTemplatesClick}
                      className="inline-flex items-center px-6 py-3 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: 'rgba(57,107,255,1)' }}
                    >
                      View Plans
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 opacity-30">
                <div className="flex items-center space-x-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100">
                    <Crown className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pro Templates</h3>
                    <p className="text-purple-600 font-medium">Premium Access</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Advanced templates with proven frameworks for maximum engagement and conversion optimization.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span>Viral content frameworks</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span>Sales funnel templates</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                    <span>Thought leadership posts</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesSection;
