
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AffiliateStats from './AffiliateStats';
import DetailedStats from './DetailedStats';
import PromotionalMaterials from './PromotionalMaterials';
import AffiliateReferralLink from './AffiliateReferralLink';

interface AffiliateTabContentProps {
  session: any;
  referralLink: string;
  stats: Array<{
    label: string;
    value: string;
    icon: React.ElementType;
    growth?: string;
  }>;
  earningsData: Array<{
    month: string;
    earnings: number;
  }>;
  progressValue: number;
  chartConfig: Record<string, any>;
  referralSourceData: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  promotionalMaterials: Array<{
    title: string;
    description: string;
    cta: string;
  }>;
}

const AffiliateTabContent = ({
  session,
  referralLink,
  stats,
  earningsData,
  progressValue,
  chartConfig,
  referralSourceData,
  colors,
  promotionalMaterials
}: AffiliateTabContentProps) => {
  const [activeTab, setActiveTab] = React.useState("overview");

  if (!session) return null;

  return (
    <>
      <AffiliateReferralLink referralLink={referralLink} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
          <TabsTrigger value="materials">Promotional Material</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <AffiliateStats 
            statsData={stats}
            earningsData={earningsData}
            progressValue={progressValue}
            chartConfig={chartConfig}
          />
        </TabsContent>
        
        <TabsContent value="stats">
          <DetailedStats 
            referralSourceData={referralSourceData}
            colors={colors}
            chartConfig={chartConfig}
          />
        </TabsContent>
        
        <TabsContent value="materials">
          <PromotionalMaterials materials={promotionalMaterials} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AffiliateTabContent;
