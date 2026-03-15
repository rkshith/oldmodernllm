import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ResidualConnectionProps {
  children: ReactNode;
  isActive: boolean;
  delay?: number;
  label?: string;
}

const ResidualConnection = ({ children, isActive, delay = 0, label = "+ Residual" }: ResidualConnectionProps) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.25 }}
      transition={{ duration: 0.25, delay: delay * 0.12 }}
    >
      {/* Main content */}
      <div className="relative ml-4">
        {children}
      </div>

      {/* Residual bypass arrow */}
      <div className="absolute left-0 top-0 bottom-0 w-4 flex items-center">
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Vertical bypass line */}
          <line
            x1="6" y1="4" x2="6" y2="100%"
            stroke="hsl(var(--stage-residual))"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity={isActive ? 0.5 : 0.15}
          />
          {/* Small arrow at bottom */}
          <polygon
            points="3,100% 6,100% 9,100%"
            fill="hsl(var(--stage-residual))"
            opacity={isActive ? 0.5 : 0.15}
          />
        </svg>
      </div>

      {/* Residual add label */}
      <div className="flex items-center gap-1.5 mt-1 ml-4">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-stage-residual/10 border border-stage-residual/20">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M2,5 C2,2 2,2 5,2 L5,0 M5,0 L5,2 C8,2 8,2 8,5" fill="none" stroke="hsl(var(--stage-residual))" strokeWidth="1" opacity="0.6" />
            <circle cx="8" cy="5" r="1.5" fill="hsl(var(--stage-residual))" opacity="0.6" />
          </svg>
          <span className="text-[8px] font-medium text-stage-residual">{label}</span>
        </div>
        <span className="text-[8px] text-muted-foreground italic">x + sublayer(x)</span>
      </div>
    </motion.div>
  );
};

export default ResidualConnection;
