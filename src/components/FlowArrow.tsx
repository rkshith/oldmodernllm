import { motion } from "framer-motion";

interface FlowArrowProps {
  isActive: boolean;
  delay?: number;
}

const FlowArrow = ({ isActive, delay = 0 }: FlowArrowProps) => (
  <motion.div
    className="flex justify-center py-1"
    initial={{ opacity: 0 }}
    animate={{ opacity: isActive ? 1 : 0.15 }}
    transition={{ duration: 0.15, delay: delay * 0.12 }}
  >
    <svg width="12" height="20" viewBox="0 0 12 20" className="text-muted-foreground">
      <line x1="6" y1="0" x2="6" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="2,14 6,20 10,14" fill="currentColor" />
    </svg>
  </motion.div>
);

export default FlowArrow;
