import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Zap, Users, Target, Heart, Award, TrendingUp, Shield, Sparkles } from 'lucide-react';

const About = () => {
  const { user } = useAuth();

  const stats = [
    { number: '10K+', label: 'Posts Enhanced', icon: Zap },
    { number: '2K+', label: 'Active Users', icon: Users },
    { number: '95%', label: 'Satisfaction Rate', icon: Heart },
    { number: '500%', label: 'Avg. Engagement Boost', icon: TrendingUp }
  ];

  const values = [
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'We believe every professional deserves tools to amplify their voice and share their expertise effectively.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your content and data are protected with enterprise-grade security. We never store or share your posts.'
    },
    {
      icon: Sparkles,
      title: 'Innovation Focus',
      description: 'Continuously evolving our AI models to provide cutting-edge content enhancement capabilities.'
    },
    {
      icon: Award,
      title: 'Quality Commitment',
      description: 'Every feature is crafted with attention to detail, ensuring professional-grade results every time.'
    }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: '/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png',
      bio: 'Former LinkedIn content strategist with 8+ years in social media marketing. Built PostPro AI after struggling with consistent content creation.',
      expertise: ['AI/ML', 'Content Strategy', 'Product Development']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Navigation
        session={user ? { user } : null}
        username={user?.user_metadata?.username || ''}
        avatarUrl={user?.user_metadata?.avatar_url || ''}
        handleSignOut={async () => {}}
        setShowPricing={() => {}}
        setMobileMenuOpen={() => {}}
        mobileMenuOpen={false}
      />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About PostPro AI
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to democratize professional content creation, 
              helping every professional amplify their voice with AI-powered enhancement tools.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    PostPro AI was born from a personal frustration. As a content creator and LinkedIn enthusiast, 
                    our founder struggled with the time-consuming process of crafting engaging posts that would 
                    resonate with professional audiences.
                  </p>
                  <p>
                    After spending countless hours researching engagement strategies, analyzing viral posts, 
                    and experimenting with different formats, the idea struck: what if AI could help anyone 
                    create professional, engaging content in minutes instead of hours?
                  </p>
                  <p>
                    Today, PostPro AI serves thousands of professionals worldwide, from startup founders to 
                    Fortune 500 executives, helping them enhance their content and grow their professional presence.
                  </p>
                </div>
              </div>
              <div className="lg:order-first">
                <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-blue-600" />
                    </div>
                    <blockquote className="text-lg italic text-gray-700 mb-4">
                      "Every professional deserves tools that amplify their expertise and help them 
                      share their knowledge with the world."
                    </blockquote>
                    <cite className="text-sm font-semibold text-gray-900">
                      - PostPro AI Mission
                    </cite>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at PostPro AI
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-6 sm:p-8 border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                The passionate individuals behind PostPro AI
              </p>
            </div>
            
            {team.map((member, index) => (
              <Card key={index} className="p-8 sm:p-10 border-0 bg-white/70 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Content?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals who trust PostPro AI to enhance their posts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/auth" 
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Get Started Free
              </a>
              <a 
                href="/enhance" 
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Try It Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;