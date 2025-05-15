import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardModernProps {
  icon: ReactNode;
  title: string;
  description: string;
  bulletPoints: string[];
  badges: string[];
  colorScheme: "primary" | "blue" | "emerald";
}

export function FeatureCardModern({
  icon,
  title,
  description,
  bulletPoints,
  badges,
  colorScheme = "primary",
}: FeatureCardModernProps) {
  // Map color schemes to their respective Tailwind classes
  const colorMap = {
    primary: {
      iconBg: "bg-gradient-to-br from-primary to-primary-dark",
      bulletBg: "bg-primary/10",
      bulletText: "text-primary",
      badgeBg: "bg-primary/10",
      badgeHoverBg: "hover:bg-primary/20",
      badgeText: "text-primary",
      cardGradient: "from-white to-primary/5",
    },
    blue: {
      iconBg: "bg-gradient-to-br from-blue-600 to-blue-800",
      bulletBg: "bg-blue-100",
      bulletText: "text-blue-600",
      badgeBg: "bg-blue-100",
      badgeHoverBg: "hover:bg-blue-200",
      badgeText: "text-blue-700",
      cardGradient: "from-white to-blue-100/30",
    },
    emerald: {
      iconBg: "bg-gradient-to-br from-emerald-600 to-emerald-800",
      bulletBg: "bg-emerald-100",
      bulletText: "text-emerald-600",
      badgeBg: "bg-emerald-100",
      badgeHoverBg: "hover:bg-emerald-200",
      badgeText: "text-emerald-700",
      cardGradient: "from-white to-emerald-100/30",
    },
  };

  const colors = colorMap[colorScheme];

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-border/10 h-full transform hover:-translate-y-1">
      <div className="relative pt-7 pb-5 px-5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full -mr-24 -mt-24"></div>
        
        <div className={`${colors.iconBg} p-3 rounded-xl w-12 h-12 flex items-center justify-center text-white mb-4 relative`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground relative">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed relative max-w-xs">
          {description}
        </p>
      </div>
      
      <div className={`p-5 pt-1 bg-gradient-to-b ${colors.cardGradient}`}>
        <div className="flex flex-col space-y-3">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <div className={`h-5 w-5 rounded-full ${colors.bulletBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <CheckCircle className={`h-2.5 w-2.5 ${colors.bulletText}`} />
              </div>
              <p className="text-xs sm:text-sm text-foreground/90">{point}</p>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-5 pb-1">
          {badges.map((badge, index) => (
            <Badge 
              key={index} 
              className={`${colors.badgeBg} ${colors.badgeHoverBg} ${colors.badgeText} border-0 text-xs px-2.5 py-0.5 rounded-full`}
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
} 