import { useMemo, useState } from "react";
import { AlertCircle, Sparkles, CheckCircle2, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EnhancePostResponse } from "../types";

interface WhyNoViewsProps {
  diagnostics: NonNullable<EnhancePostResponse["diagnostics"]>;
}

type Watchout = {
  severity: "fix" | "boost" | "keep";
  label: string;
  message: string;
  raw: string;
};

const parseWatchout = (reason: string): Watchout => {
  const [rawLabel, rawMessage] = reason.includes("→") ? reason.split("→") : ["Fix now", reason];
  const normalizedLabel = rawLabel.trim().toLowerCase();
  let severity: Watchout["severity"] = "keep";

  if (normalizedLabel.includes("fix")) {
    severity = "fix";
  } else if (normalizedLabel.includes("boost") || normalizedLabel.includes("test") || normalizedLabel.includes("next")) {
    severity = "boost";
  }

  const label = severity === "fix" ? "Fix now" : severity === "boost" ? "Boost" : "Keep";
  const message = (rawMessage ?? reason).trim();

  return { severity, label, message, raw: reason };
};

export const WhyNoViews = ({ diagnostics }: WhyNoViewsProps) => {
  const [showWatchouts, setShowWatchouts] = useState(false);
  const watchouts = useMemo(() => diagnostics.viewReasons.map(parseWatchout), [diagnostics.viewReasons]);
  const hasWatchouts = watchouts.length > 0;

  const renderList = (items: string[], emptyFallback: string) => {
    if (!items.length) {
      return <p className="text-sm text-muted-foreground">{emptyFallback}</p>;
    }

    return (
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

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
        {hasWatchouts ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-destructive">
                <AlertCircle className="h-4 w-4" />
                Potential slowdowns
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                onClick={() => setShowWatchouts((prev) => !prev)}
              >
                {showWatchouts ? "Hide checks" : "Show checks"}
              </Button>
            </div>
            {showWatchouts ? (
              <ul className="mt-3 space-y-3">
                {watchouts.map((item, index) => (
                  <li key={index} className="flex flex-col gap-1 rounded-md bg-white/80 p-3 text-sm text-muted-foreground shadow-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.severity === "fix" ? "destructive" : item.severity === "boost" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground/70">{item.raw.split("→")[0]?.trim()}</span>
                    </div>
                    <span className="leading-relaxed text-slate-700">{item.message}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 flex items-center gap-2 text-xs text-destructive/80">
                <EyeOff className="h-3.5 w-3.5" />
                Checks tucked away. Open to see what to adjust.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-emerald-700">
            <CheckCircle2 className="mr-2 inline-block h-4 w-4" />
            No major blockers detected—ship it and focus on timing/distribution.
          </div>
        )}

        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Instant upgrades
          </h3>
          {renderList(
            diagnostics.quickWins,
            "Already in great shape—consider testing a new hook."
          )}
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
