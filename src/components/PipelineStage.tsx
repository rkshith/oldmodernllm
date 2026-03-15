import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PipelineStageProps {
  label: string;
  sublabel?: string;
  colorVar: string;
  children: ReactNode;
  isActive: boolean;
  delay?: number;
  tooltip?: string;
}

const colorMap: Record<string, string> = {
  tokenize: "hsl(210, 80%, 55%)",
  position: "hsl(280, 65%, 55%)",
  attention: "hsl(145, 60%, 42%)",
  ffn: "hsl(35, 90%, 55%)",
  norm: "hsl(340, 65%, 55%)",
  cache: "hsl(195, 80%, 45%)",
  output: "hsl(260, 60%, 55%)",
  residual: "hsl(170, 50%, 45%)",
};

const PipelineStage = ({ label, sublabel, colorVar, children, isActive, delay = 0, tooltip }: PipelineStageProps) => {
  const borderColor = colorMap[colorVar] || "hsl(var(--border))";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 0 }}
      transition={{ duration: 0.25, delay: delay * 0.12 }}
      className="relative group"
      title={tooltip}
    >
      <div
        className="rounded-lg border-2 px-4 py-3 transition-all duration-200"
        style={{
          borderColor: isActive ? borderColor : "hsl(var(--border))",
          backgroundColor: isActive ? `${borderColor}08` : "transparent",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: borderColor }}
          />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: borderColor }}>
            {label}
          </span>
          {sublabel && (
            <span className="text-[10px] text-muted-foreground ml-auto">
              {sublabel}
            </span>
          )}
        </div>
        <div className="min-h-[2rem]">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineStage;
