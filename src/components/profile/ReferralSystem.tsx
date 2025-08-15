import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Copy, Gift, Star, Share, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Referral {
  id: string;
  referred_user_id: string;
  referred_user_plan: string;
  created_at: string;
}

interface ReferralStats {
  totalReferrals: number;
  freeReferrals: number;
  paidReferrals: number;
  bonusEnhancements: number;
}

const ReferralSystem = ({ userId }: { userId: string }) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    freeReferrals: 0,
    paidReferrals: 0,
    bonusEnhancements: 0
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const referralLink = `${window.location.origin}?ref=${userId}`;

  useEffect(() => {
    const fetchReferralData = async () => {
      if (!userId) return;

      try {
        // Fetch referrals
        const { data: referralData, error: referralError } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', userId)
          .order('created_at', { ascending: false });

        if (referralError) throw referralError;

        setReferrals(referralData || []);

        // Calculate stats
        const totalReferrals = referralData?.length || 0;
        const freeReferrals = referralData?.filter(r => r.referred_user_plan === 'free').length || 0;
        const paidReferrals = referralData?.filter(r => r.referred_user_plan !== 'free').length || 0;

        // Fetch bonus enhancements from profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('free_enhancements')
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;

        setStats({
          totalReferrals,
          freeReferrals,
          paidReferrals,
          bonusEnhancements: profileData?.free_enhancements || 0
        });

      } catch (error) {
        console.error('Error fetching referral data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, [userId]);

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to copy link",
        variant: "destructive",
      });
    }
  };

  const shareReferralLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join PostPro AI',
          text: 'Transform your LinkedIn posts with AI! Get better engagement and save time.',
          url: referralLink,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      copyReferralLink();
    }
  };

  if (loading) {
    return (
      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm border border-green-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-fade-in">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-cabinet">Referral Program</h3>
              <p className="text-sm text-gray-600 font-cabinet">Earn rewards by inviting friends</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/80">
            {stats.totalReferrals} referrals
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/60 rounded-lg border border-white/40">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</div>
          </div>

          <div className="p-4 bg-white/60 rounded-lg border border-white/40">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-gray-600">Free Users</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.freeReferrals}</div>
          </div>

          <div className="p-4 bg-white/60 rounded-lg border border-white/40">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-gray-600">Paid Users</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.paidReferrals}</div>
          </div>

          <div className="p-4 bg-white/60 rounded-lg border border-white/40">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-medium text-gray-600">Bonus</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.bonusEnhancements}</div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 font-cabinet">Your Referral Link</h4>
          
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-white/80 border-white/50 font-mono text-sm"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={copyReferralLink}
                    variant="outline"
                    size="icon"
                    className="bg-white/80 hover:bg-white border-white/50"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy link</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={shareReferralLink}
                    variant="outline"
                    size="icon"
                    className="bg-white/80 hover:bg-white border-white/50"
                  >
                    <Share className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share link</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="p-4 bg-white/60 rounded-lg border border-white/40">
          <h5 className="font-semibold text-gray-900 mb-3 font-cabinet">How it Works</h5>
          <div className="space-y-2 text-sm text-gray-600 font-cabinet">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free users: +2 bonus enhancements per referral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Monthly plan: +10 bonus enhancements per referral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Annual plan: +20 bonus enhancements per referral</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>5 paid referrals in a week: +50 bonus enhancements</span>
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        {referrals.length > 0 && (
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900 font-cabinet">Recent Referrals</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {referrals.slice(0, 5).map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 bg-white/40 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      referral.referred_user_plan === 'free' ? 'bg-green-400' : 
                      referral.referred_user_plan === 'annual' ? 'bg-purple-400' : 'bg-blue-400'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 font-cabinet">
                        User joined with {referral.referred_user_plan} plan
                      </p>
                      <p className="text-xs text-gray-500 font-cabinet">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    +{referral.referred_user_plan === 'free' ? '2' : 
                       referral.referred_user_plan === 'annual' ? '20' : '10'} credits
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-white/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={shareReferralLink}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg font-cabinet"
            >
              <Share className="w-4 h-4 mr-2" />
              Share & Earn
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://docs.lovable.dev', '_blank')}
              className="bg-white/80 hover:bg-white border-white/50 font-cabinet"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReferralSystem;