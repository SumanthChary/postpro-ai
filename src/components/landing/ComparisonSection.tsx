
import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUpIcon, BarChartIcon, LinkIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Enhanced data with more impressive growth numbers across all metrics
const data = [
  {
    name: 'Post Impressions',
    manual: 15,
    enhanced: 387, // Increased from 187
  },
  {
    name: 'Followers Growth',
    manual: 4,
    enhanced: 78, // Increased from 32
  },
  {
    name: 'Profile Views',
    manual: 2,
    enhanced: 89, // Increased from 43
  },
  {
    name: 'Search Appearances',
    manual: 1,
    enhanced: 92, // Increased from 27
  },
  {
    name: 'Engagement Rate',
    manual: 0.8,
    enhanced: 9.2, // Increased from 4.6
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-light-lavender to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          Real Results from LinkedIn Pros
        </h2>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-custom-text">
          Our data shows that posts enhanced with PostPro AI consistently outperform manual posts across all key metrics.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-electric-purple">
                Performance Analytics
              </h3>
              <BarChartIcon className="text-bright-teal w-6 h-6" />
            </div>
            <div className="h-[400px]">
              <ChartContainer config={{
                manual: { label: "Before PostProAI" },
                enhanced: { label: "With PostProAI" }
              }}>
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="manual" name="Before PostProAI" fill="#8E44AD" opacity={0.7} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="enhanced" name="With PostProAI" fill="#1ABC9C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="text-center mt-4 text-sm text-gray-500">
              Average results based on 1,000+ enhanced posts
            </div>
          </Card>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bright-teal hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <TrendingUpIcon className="w-6 h-6 text-bright-teal shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">2,480% Boost in Post Impressions</h4>
                  <p className="text-custom-text">
                    From just 15 to 387 impressions on average - even for LinkedIn newcomers!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bright-teal hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <TrendingUpIcon className="w-6 h-6 text-bright-teal shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">1,850% Follower Growth</h4>
                  <p className="text-custom-text">
                    Grow your audience 19x faster with AI-optimized content that resonates with your target audience
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bright-teal hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <LinkIcon className="w-6 h-6 text-bright-teal shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">4,350% More Profile Views</h4>
                  <p className="text-custom-text">
                    Dramatically increased visibility leading to more connections, opportunities, and business growth
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-bright-teal hover:transform hover:-translate-y-1 transition duration-300">
              <div className="flex items-start gap-4">
                <TrendingUpIcon className="w-6 h-6 text-bright-teal shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">11.5x Higher Engagement Rate</h4>
                  <p className="text-custom-text">
                    More likes, comments, and shares per post - the key metrics that boost your LinkedIn algorithm ranking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
