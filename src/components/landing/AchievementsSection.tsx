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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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

          {/* PeerPush Badge */}
          <Card className="relative overflow-hidden border-green-200/50 bg-gradient-to-br from-green-50/50 to-emerald-50/50 hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <a 
                  href="https://peerpush.net/p/postpro-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group-hover:scale-105 transition-transform duration-300 block"
                >
                  <img
                    src="https://peerpush.net/p/postpro-ai/badge"
                    alt="PostPro AI PeerPush badge"
                    className="h-12 w-auto"
                  />
                </a>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Community Verified</h3>
              <p className="text-sm text-green-700/80 mb-3">
                Verified and trusted by the PeerPush community
              </p>
              <a 
                href="https://peerpush.net/p/postpro-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-green-700 hover:text-green-800 transition-colors"
              >
                View on PeerPush
                <TrendingUp className="h-3 w-3 ml-1" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;