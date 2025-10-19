import { cn } from "@/lib/utils";

interface SemiCircularGaugeProps {
  value: number;
  size?: number; // width in pixels
  strokeWidth?: number;
  trackColor?: string;
  indicatorColor?: string;
  className?: string;
  label?: string;
  valueSuffix?: string;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const SemiCircularGauge = ({
  value,
  size = 180,
  strokeWidth = 12,
  trackColor = "#e2e8f0",
  indicatorColor = "#2563eb",
  className,
  label,
  valueSuffix = "%"
}: SemiCircularGaugeProps) => {
  const clamped = clamp(value, 0, 100);
  const viewBoxWidth = 120;
  const viewBoxHeight = 70;
  const radius = 50;
  const circumference = Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <svg
        width={size}
        height={Math.round(size * 0.55)}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        role="img"
        aria-label={label ? `${label}: ${clamped}${valueSuffix}` : `Gauge value ${clamped}${valueSuffix}`}
      >
        <path
          d="M10 60 A50 50 0 0 1 110 60"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M10 60 A50 50 0 0 1 110 60"
          stroke={indicatorColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text
          x="60"
          y="58"
          textAnchor="middle"
          fill={indicatorColor || "#1f2937"}
          fontSize="22"
          fontWeight="600"
        >
          {`${Math.round(clamped)}${valueSuffix}`}
        </text>
      </svg>
      {label && (
        <span className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          {label}
        </span>
      )}
    </div>
  );
};

export default SemiCircularGauge;
