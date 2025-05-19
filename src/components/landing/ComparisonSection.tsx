
import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, BarChart as BarChartIcon, Link, Zap } from 'lucide-react';

// Enhanced data with more impressive growth numbers across all metrics
const data = [
  {
    name: 'Post Impressions',
    manual: 15,
    enhanced: 387,
  },
  {
    name: 'Followers Growth',
    manual: 4,
    enhanced: 78,
  },
  {
    name: 'Profile Views',
    manual: 2,
    enhanced: 89,
  },
  {
    name: 'Search Appearances',
    manual: 1,
    enhanced: 92,
  },
  {
    name: 'Engagement Rate',
    manual: 0.8,
    enhanced: 9.2,
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="px-4 py-2 bg-electric-purple/10 rounded-full text-sm font-medium text-electric-purple inline-block mb-3">
            Proven Results
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Real Results from LinkedIn Professionals
          </h2>
          <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-custom-text">
            Our data shows that posts enhanced with PostPro AI consistently outperform manual posts across all key metrics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Card className="p-5 sm:p-7 shadow-lg border-0 rounded-2xl bg-white">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-custom-text">
                Performance Analytics
              </h3>
              <BarChartIcon className="text-electric-purple w-6 h-6" />
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    tick={{fontSize: 10}}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}
                    formatter={(value, name) => {
                      return [value, name === 'manual' ? 'Before PostProAI' : 'With PostProAI'];
                    }}
                  />
                  <Legend wrapperStyle={{fontSize: '12px'}} />
                  <Bar dataKey="manual" name="Before PostProAI" fill="#8E44AD" opacity={0.6} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enhanced" name="With PostProAI" fill="#1ABC9C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4 text-xs sm:text-sm text-gray-500">
              Average results based on 1,000+ enhanced posts
            </div>
          </Card>
          
          <div className="space-y-5">
            <Card className="bg-white p-5 rounded-xl shadow-md border-l-4 border-bright-teal hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-bright-teal/10 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-bright-teal" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">2,480% Boost in Post Impressions</h4>
                  <p className="text-custom-text text-sm">
                    From just 15 to 387 impressions on average - even for LinkedIn newcomers!
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white p-5 rounded-xl shadow-md border-l-4 border-electric-purple hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-electric-purple/10 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-electric-purple" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">1,850% Follower Growth</h4>
                  <p className="text-custom-text text-sm">
                    Grow your audience 19x faster with AI-optimized content that resonates with your target audience
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white p-5 rounded-xl shadow-md border-l-4 border-bright-teal hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-bright-teal/10 p-2 rounded-lg">
                  <Link className="w-6 h-6 text-bright-teal" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">4,350% More Profile Views</h4>
                  <p className="text-custom-text text-sm">
                    Dramatically increased visibility leading to more connections, opportunities, and business growth
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white p-5 rounded-xl shadow-md border-l-4 border-electric-purple hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-electric-purple/10 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-electric-purple" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">11.5x Higher Engagement Rate</h4>
                  <p className="text-custom-text text-sm">
                    More likes, comments, and shares per post - the key metrics that boost your LinkedIn algorithm ranking
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
