import React, { useState } from 'react';
import { WhopAuthWrapper } from '@/components/whop/WhopAuthWrapper';
import PostEnhancer from '@/components/post-enhancer/PostEnhancer';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Shield, Zap, Users, Star, TrendingUp, Clock, Award } from 'lucide-react';

const WhopApp: React.FC = () => {
  const [post, setPost] = useState('');
  const [category, setCategory] = useState('general');
  const [styleTone, setStyleTone] = useState('professional');

  const trustFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption protects your content"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate content in under 3 seconds"
    },
    {
      icon: Users,
      title: "50,000+ Users",
      description: "Trusted by professionals worldwide"
    }
  ];

  const socialProof = [
    { name: "Sarah Chen", role: "Marketing Director", rating: 5, text: "Increased my engagement by 300% in just one month!" },
    { name: "Mike Rodriguez", role: "Content Creator", rating: 5, text: "PostPro AI saves me 5+ hours every week." },
    { name: "Emily Davis", role: "Social Media Manager", rating: 5, text: "The virality predictions are incredibly accurate." }
  ];

  const stats = [
    { icon: TrendingUp, value: "300%", label: "Avg. Engagement Boost" },
    { icon: Clock, value: "5hrs", label: "Saved Per Week" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
    { icon: Award, value: "50K+", label: "Happy Users" }
  ];

  return (
    <WhopAuthWrapper>
      <div className="min-h-screen page-gradient">
        {/* Professional Header */}
        <div className="border-b bg-white/80 backdrop-blur-lg shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="h-12 w-12 brand-bg rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="text-center">
                <h1 className="responsive-text-lg font-bold heading-black">PostPro AI</h1>
                <p className="text-sm subheading-black">Professional Content Enhancement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-8 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>50,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Enhancement Tool */}
            <div className="lg:col-span-2">
              <Card className="modern-card responsive-p-md">
                <CardContent className="p-0">
                  <PostEnhancer 
                    post={post} 
                    setPost={setPost} 
                    category={category} 
                    setCategory={setCategory} 
                    styleTone={styleTone} 
                    setStyleTone={setStyleTone} 
                  />
                </CardContent>
              </Card>
            </div>

            {/* Trust Sidebar */}
            <div className="space-y-6">
              {/* Performance Stats */}
              <Card className="modern-card responsive-p-sm">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm heading-black mb-4">Proven Results</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <stat.icon className="h-5 w-5 brand-color mx-auto mb-1" />
                        <div className="font-bold text-lg heading-black">{stat.value}</div>
                        <div className="text-xs subheading-black">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Features */}
              <Card className="modern-card responsive-p-sm">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm heading-black mb-4">Why Choose PostPro AI?</h3>
                  <div className="space-y-4">
                    {trustFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <feature.icon className="h-5 w-5 brand-color mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-sm heading-black">{feature.title}</h4>
                          <p className="text-xs subheading-black">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Money Back Guarantee */}
              <Card className="modern-card responsive-p-sm bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-bold text-sm heading-black mb-1">30-Day Guarantee</h3>
                  <p className="text-xs subheading-black">Not satisfied? Get your money back, no questions asked.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="mt-12">
            <h2 className="responsive-text-base font-bold heading-black text-center mb-8">Trusted by 50,000+ Professionals</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {socialProof.map((testimonial, idx) => (
                <Card key={idx} className="modern-card responsive-p-sm">
                  <CardContent className="p-4">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm subheading-black mb-3 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-sm heading-black">{testimonial.name}</p>
                      <p className="text-xs subheading-black">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Card className="modern-card responsive-p-md premium-gradient">
              <CardContent className="p-8">
                <h2 className="responsive-text-lg font-bold heading-black mb-4">Ready to Transform Your Content?</h2>
                <p className="responsive-text-sm subheading-black mb-6">Join thousands of professionals who trust PostPro AI for their content enhancement needs.</p>
                <div className="flex items-center justify-center space-x-4 text-sm subheading-black">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>Instant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span>Guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </WhopAuthWrapper>
  );
};

export default WhopApp;