import { Check, X } from "lucide-react";

const ComparisonTable = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Compare to the Rest
          </h2>
          <p className="text-lg text-muted-foreground">
            Not all AI writing tools are created equal. Here's why professionals choose us:
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full bg-card border border-border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-4 font-semibold">Feature</th>
                <th className="text-center p-4 font-semibold text-primary">PostPro AI</th>
                <th className="text-center p-4 font-semibold text-muted-foreground">ChatGPT</th>
                <th className="text-center p-4 font-semibold text-muted-foreground">Generic AI Tools</th>
                <th className="text-center p-4 font-semibold text-muted-foreground">Hiring a Writer</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-4">LinkedIn-Specific AI</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
              </tr>

              <tr className="border-t border-border bg-muted/20">
                <td className="p-4">Virality Predictor (89% accurate)</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
              </tr>

              <tr className="border-t border-border">
                <td className="p-4">Real-Time Trending Hashtags</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
              </tr>

              <tr className="border-t border-border bg-muted/20">
                <td className="p-4">50+ Proven Templates</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><span className="text-muted-foreground text-sm">Limited</span></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
              </tr>

              <tr className="border-t border-border">
                <td className="p-4">Custom CTA Generator</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><X className="w-5 h-5 text-muted-foreground mx-auto" /></td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
              </tr>

              <tr className="border-t border-border bg-muted/20">
                <td className="p-4">Instant Results (30 seconds)</td>
                <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                <td className="text-center p-4"><span className="text-muted-foreground text-sm">Manual</span></td>
                <td className="text-center p-4"><span className="text-muted-foreground text-sm">Varies</span></td>
                <td className="text-center p-4"><span className="text-muted-foreground text-sm">2-3 days</span></td>
              </tr>

              <tr className="border-t border-border">
                <td className="p-4 font-semibold">Monthly Cost</td>
                <td className="text-center p-4 font-bold text-primary">$7 - $14 (after 7-day trial)</td>
                <td className="text-center p-4 text-muted-foreground">$20+</td>
                <td className="text-center p-4 text-muted-foreground">$15-30</td>
                <td className="text-center p-4 text-muted-foreground">$500-2000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Save 4+ hours per week and <span className="text-primary">$6,000+ per year</span> vs hiring a writer
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
