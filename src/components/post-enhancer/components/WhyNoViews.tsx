import { AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EnhancePostResponse } from "../types";

interface WhyNoViewsProps {
  diagnostics: NonNullable<EnhancePostResponse["diagnostics"]>;
}

const renderList = (items: string[], emptyFallback: string) => {
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">{emptyFallback}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const WhyNoViews = ({ diagnostics }: WhyNoViewsProps) => {
  return (
    <Card className="border-destructive/20">
      <CardHeader className="flex flex-col gap-1">
        <Badge variant="outline" className="self-start border-destructive text-destructive">
          Why views might stall
        </Badge>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Why this post might struggle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-destructive">
            <AlertCircle className="h-4 w-4" />
            Watch-outs
          </h3>
          {renderList(diagnostics.viewReasons, "No major blockers detected—optimize timing and distribution.")}
        </div>

        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Instant upgrades
          </h3>
          {renderList(diagnostics.quickWins, "Already in great shape—consider testing a new hook.")}
        </div>

        {diagnostics.highlights?.length ? (
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              What\'s working
            </h3>
            <ul className="space-y-2">
              {diagnostics.highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WhyNoViews;
