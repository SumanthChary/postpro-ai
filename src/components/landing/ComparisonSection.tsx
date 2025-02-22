
import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUpIcon } from 'lucide-react';

const data = [
  {
    name: 'Post Impressions',
    manual: 15,
    enhanced: 101,
  },
  {
    name: 'Followers Growth',
    manual: 4,
    enhanced: 5,
  },
  {
    name: 'Profile Views',
    manual: 2,
    enhanced: 5,
  },
  {
    name: 'Search Appearances',
    manual: 1,
    enhanced: 3,
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-light-lavender to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          Real Results from a LinkedIn Newcomer
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-electric-purple">
              Analytics Comparison
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="manual" name="Before PostProAI" fill="#8E44AD" />
                  <Bar dataKey="enhanced" name="With PostProAI" fill="#1ABC9C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <TrendingUpIcon className="w-6 h-6 text-bright-teal" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">677% Boost in Post Impressions</h4>
                  <p className="text-custom-text">
                    From just 15 to 101 impressions in 7 days - even as a LinkedIn newcomer!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <TrendingUpIcon className="w-6 h-6 text-bright-teal" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">25% Follower Growth</h4>
                  <p className="text-custom-text">
                    Attract more relevant followers with AI-optimized content
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <TrendingUpIcon className="w-6 h-6 text-bright-teal" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">150% More Profile Views</h4>
                  <p className="text-custom-text">
                    Increased visibility leading to more professional opportunities
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
