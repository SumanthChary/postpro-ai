import { Card } from "@/components/ui/card";
import { FileTextIcon, RocketIcon, LockIcon, Sparkles, Crown } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
interface TemplatesSectionProps {
  handleProTemplatesClick: () => void;
}
const TemplatesSection = ({
  handleProTemplatesClick
}: TemplatesSectionProps) => {
  const {
    user
  } = useAuth();
  const [isProUser, setIsProUser] = useState(false);
  useEffect(() => {
    const fetchUserPlan = async () => {
      // Set default to false since user.plan doesn't exist on User type
      setIsProUser(false);
    };
    fetchUserPlan();
  }, [user]);
  return <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
              Content Templates
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed px-2">
            Professional templates designed to elevate your social media content
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {/* Basic Templates Card */}
          <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-green-100 group-hover:scale-110 transition-transform duration-300">
                  <FileTextIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Basic Templates</h3>
                  <p className="text-green-600 font-medium text-xs sm:text-sm md:text-base">Free Access</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                Essential templates for everyday social media posts. Perfect for getting started with professional content creation.
              </p>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mr-2 sm:mr-3"></div>
                  <span>LinkedIn post templates</span>
                </div>
                <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mr-2 sm:mr-3"></div>
                  <span>Twitter thread starters</span>
                </div>
                <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 mr-2 sm:mr-3"></div>
                  <span>Instagram captions</span>
                </div>
              </div>
              
              <a href="https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 sm:px-5 lg:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-200 hover:shadow-lg group-hover:scale-105 min-h-[44px]" style={{
              backgroundColor: 'rgba(57,107,255,1)'
            }}>
                View Templates
                <RocketIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 sm:ml-2" />
              </a>
            </div>
          </Card>

          {/* Pro Templates Card */}
          {isProUser ? <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-bold text-white" style={{
            backgroundColor: 'rgba(57,107,255,1)'
          }}>
                PRO
              </div>
              
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 group-hover:scale-110 transition-transform duration-300">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Pro Templates</h3>
                    <p className="text-purple-600 font-medium text-xs sm:text-sm md:text-base">Premium Access</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Advanced templates with proven frameworks for maximum engagement and conversion optimization.
                </p>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-2 sm:mr-3"></div>
                    <span>Viral content frameworks</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-2 sm:mr-3"></div>
                    <span>Sales funnel templates</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-2 sm:mr-3"></div>
                    <span>Thought leadership posts</span>
                  </div>
                </div>
                
                <a href="https://docs.google.com/document/d/1M-UTmrH6HtCT2ZfA1N7Prsr_U91Kd9fp5pklwdhJ9Dk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 sm:px-5 lg:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-200 hover:shadow-lg group-hover:scale-105 min-h-[44px]">
                  Access Pro Templates
                  <RocketIcon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 sm:ml-2" />
                </a>
              </div>
            </Card> : <Card className="p-4 sm:p-6 lg:p-8 xl:p-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-white/90 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center space-y-3 sm:space-y-4 px-3">
                  <div className="p-3 sm:p-4 rounded-full bg-white shadow-lg mx-auto w-fit">
                    <LockIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" style={{
                  color: 'rgba(57,107,255,1)'
                }} />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Upgrade to Pro</h4>
                    <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Unlock premium templates</p>
                    <button onClick={handleProTemplatesClick} className="inline-flex items-center px-4 sm:px-5 lg:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-200 hover:shadow-lg min-h-[44px]" style={{
                  backgroundColor: 'rgba(57,107,255,1)'
                }}>
                      View Plans
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 opacity-30">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Pro Templates</h3>
                    <p className="text-purple-600 font-medium text-xs sm:text-sm md:text-base">Premium Access</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Advanced templates with proven frameworks for maximum engagement and conversion optimization.
                </p>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-2 sm:mr-3"></div>
                    <span>Viral content frameworks</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-2 sm:mr-3"></div>
                    <span>Sales funnel templates</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm md:text-base">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 mr-2 sm:mr-3"></div>
                    <span>Thought leadership posts</span>
                  </div>
                </div>
              </div>
            </Card>}
        </div>
      </div>
    </div>;
};
export default TemplatesSection;