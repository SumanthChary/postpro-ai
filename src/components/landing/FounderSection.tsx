import { Card } from "@/components/ui/card";

const FounderSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="p-8 border border-navy/10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue to-navy rounded-full flex items-center justify-center text-white text-4xl font-bold">
                A
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                Why I Built PostPro AI
              </h2>
              <p className="text-navy/70 text-lg leading-relaxed mb-6">
                After struggling for months to get noticed on LinkedIn, posting content that barely got 5 likes, 
                I realized most professionals face the same challenge. We know we should be building authority, 
                but creating engaging content consistently feels impossible.
              </p>
              <p className="text-navy/70 text-lg leading-relaxed mb-6">
                PostPro AI was born from this frustration. I wanted a tool that doesn't just generate content, 
                but actually predicts what will resonate with your audience and helps you build genuine authority 
                in your field.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div>
                  <p className="font-semibold text-navy">Alex Thompson</p>
                  <p className="text-navy/60">Founder & CEO</p>
                </div>
                <div className="hidden sm:block text-navy/30">|</div>
                <div className="text-sm text-navy/60">
                  Previously at Microsoft, 10+ years in content strategy
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FounderSection;