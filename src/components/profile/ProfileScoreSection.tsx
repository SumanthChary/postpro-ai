
import { Progress } from "@/components/ui/progress";

interface ProfileScoreSectionProps {
  profileScore: number;
  improvements: string[];
}

export const ProfileScoreSection = ({
  profileScore,
  improvements,
}: ProfileScoreSectionProps) => {
  return (
    <div className="space-y-3 p-4 bg-secondary/20 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Profile Completion</span>
          <span className="text-sm font-medium">{profileScore}%</span>
        </div>
        <Progress value={profileScore} className="w-full" />
      </div>
      {improvements.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium">Suggestions:</span>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            {improvements.map((improvement, idx) => (
              <li key={idx}>{improvement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
