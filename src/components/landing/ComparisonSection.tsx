
import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowTrendingUpIcon } from 'lucide-react';

const data = [
  {
    name: 'Engagement Rate',
    manual: 2.4,
    enhanced: 5.8,
  },
  {
    name: 'Impressions',
    manual: 1200,
    enhanced: 3500,
  },
  {
    name: 'Click Rate',
    manual: 1.2,
    enhanced: 3.6,
  },
  {
    name: 'Comments',
    manual: 8,
    enhanced: 24,
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-light-lavender to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-center mb-8">
          The Impact of AI Enhancement
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
                  <Bar dataKey="manual" name="Manual Posts" fill="#8E44AD" />
                  <Bar dataKey="enhanced" name="AI-Enhanced" fill="#1ABC9C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <ArrowTrendingUpIcon className="w-6 h-6 text-bright-teal" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">142% Higher Engagement</h4>
                  <p className="text-custom-text">
                    AI-enhanced posts consistently outperform manual posts in engagement metrics
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <ArrowTrendingUpIcon className="w-6 h-6 text-bright-teal" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">3x More Impressions</h4>
                  <p className="text-custom-text">
                    Reach a wider audience with optimized content and strategic hashtags
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <ArrowTrendingUpIcon className="w-6 h-6 text-bright-teal" />
                <div>
                  <h4 className="text-lg font-semibold mb-2">200% More Comments</h4>
                  <p className="text-custom-text">
                    Generate more meaningful conversations and connections
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
