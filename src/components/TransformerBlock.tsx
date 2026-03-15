import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TransformerBlockProps {
  children: ReactNode;
  isActive: boolean;
  delay?: number;
  variant: "classic" | "modern";
}

const TransformerBlock = ({ children, isActive, delay = 0, variant }: TransformerBlockProps) => {
  const borderColor = variant === "classic"
    ? "hsl(var(--stage-attention))"
    : "hsl(var(--primary))";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.3, delay: delay ? delay * 0.12 : 0 }}
      className="relative rounded-xl border-2 border-dashed px-3 py-4 my-1"
      style={{
        borderColor: isActive ? `${borderColor}44` : "hsl(var(--border))",
        backgroundColor: isActive ? `${borderColor}04` : "transparent",
      }}
    >
      {/* Block header */}
      <div className="absolute -top-2.5 left-3 px-2 bg-background">
        <span
          className={`text-[9px] font-semibold uppercase tracking-widest ${
            variant === "classic" ? "font-classic" : "font-modern"
          }`}
          style={{ color: borderColor }}
        >
          Transformer Block
        </span>
      </div>

      <div className="space-y-0">
        {children}
      </div>

      {/* Repeated N times */}
      <div className="absolute -bottom-2.5 right-3 px-2 bg-background">
        <span className="text-[9px] text-muted-foreground italic">
          × N layers
        </span>
      </div>
    </motion.div>
  );
};

export default TransformerBlock;
