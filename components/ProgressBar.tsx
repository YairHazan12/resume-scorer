interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: "blue" | "green" | "yellow" | "red";
}

export default function ProgressBar({
  value,
  max = 100,
  className = "",
  color = "blue",
}: ProgressBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  
  const colors = {
    blue: "from-blue-600 to-blue-400",
    green: "from-green-600 to-emerald-600",
    yellow: "from-yellow-600 to-orange-600",
    red: "from-red-600 to-rose-600",
  };

  return (
    <div className={`bg-gray-800 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-1000`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
