import { motion } from "framer-motion";

interface QKVProjectionProps {
  isActive: boolean;
  delay?: number;
  variant: "classic" | "modern";
}

const QKVProjection = ({ isActive, delay = 0, variant }: QKVProjectionProps) => {
  const fontClass = variant === "classic" ? "font-classic" : "font-modern";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.2, delay: delay ? delay * 0.12 : 0 }}
      className="mb-2"
    >
      <div className={`text-[8px] text-muted-foreground mb-1.5 ${fontClass}`}>Linear Projections:</div>
      <div className="flex items-center gap-1.5">
        {/* Input */}
        <div className="px-1.5 py-1 rounded bg-muted text-[8px] text-muted-foreground font-medium shrink-0">X</div>

        {/* Arrow fork */}
        <svg width="20" height="36" viewBox="0 0 20 36" className="shrink-0">
          <path d="M2,18 L10,6" stroke="hsl(var(--stage-attention))" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M2,18 L10,18" stroke="hsl(var(--stage-attention))" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M2,18 L10,30" stroke="hsl(var(--stage-attention))" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>

        {/* Q, K, V boxes */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 rounded bg-stage-attention/15 border border-stage-attention/25 text-[7px] text-stage-attention font-semibold">Q</div>
            <span className={`text-[7px] text-muted-foreground ${fontClass}`}>= X · W<sub>q</sub></span>
          </div>
          <div className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 rounded bg-stage-attention/15 border border-stage-attention/25 text-[7px] text-stage-attention font-semibold">K</div>
            <span className={`text-[7px] text-muted-foreground ${fontClass}`}>= X · W<sub>k</sub></span>
          </div>
          <div className="flex items-center gap-1">
            <div className="px-1.5 py-0.5 rounded bg-stage-attention/15 border border-stage-attention/25 text-[7px] text-stage-attention font-semibold">V</div>
            <span className={`text-[7px] text-muted-foreground ${fontClass}`}>= X · W<sub>v</sub></span>
          </div>
        </div>
      </div>

      {/* Attention formula */}
      <div className={`text-[8px] text-muted-foreground mt-1.5 ${fontClass}`}>
        Attention(Q,K,V) = softmax(QK<sup>T</sup>/√d<sub>k</sub>) · V
      </div>
    </motion.div>
  );
};

export default QKVProjection;
