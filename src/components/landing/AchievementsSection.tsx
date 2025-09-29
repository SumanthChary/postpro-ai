import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import productBurstPOTDBadge from '@/assets/productburst-potd-badge.png';

const AchievementsSection = () => {
  return (
    <div className="py-8 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
            <Trophy className="h-3 w-3 mr-1" />
            Recognition & Awards
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted by the Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PostPro AI has been recognized by leading platforms and communities for innovation in AI-powered content creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* ProductBurst Product of the Day */}
          <Card className="relative overflow-hidden border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-orange-50/50 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <img 
                    src={productBurstPOTDBadge} 
                    alt="ProductBurst Product of the Day" 
                    className="h-16 w-auto group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                    <Star className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Product of the Day</h3>
              <p className="text-sm text-amber-700/80 mb-3">
                Featured as the top product on ProductBurst
              </p>
              <a 
                href="https://productburst.com/product/postpro-ai?ref=productburst" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
              >
                View on ProductBurst
                <TrendingUp className="h-3 w-3 ml-1" />
              </a>
            </CardContent>
          </Card>

          {/* Community Growth */}
          <Card className="relative overflow-hidden border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Growing Community</h3>
              <p className="text-sm text-blue-700/80 mb-3">
                Thousands of creators trust PostPro AI daily
              </p>
              <div className="text-xs font-medium text-blue-700">
                Join the movement
              </div>
            </CardContent>
          </Card>

          {/* Innovation Award */}
          <Card className="relative overflow-hidden border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">AI Innovation</h3>
              <p className="text-sm text-purple-700/80 mb-3">
                Leading the future of content creation
              </p>
              <div className="text-xs font-medium text-purple-700">
                Advanced AI Technology
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;