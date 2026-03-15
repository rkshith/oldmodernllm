import { useRef, useEffect } from "react";

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
}

const InputArea = ({ value, onChange }: InputAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.min(ref.current.scrollHeight, 120) + "px";
    }
  }, [value]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-6 pb-4">
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a sentence to visualize the transformer pipeline..."
          rows={1}
          className="w-full resize-none bg-card border border-border rounded-lg px-5 py-4 font-modern text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 shadow-sm"
        />
        <div className="absolute right-4 bottom-4 text-[10px] text-muted-foreground tracking-wide uppercase">
          Live Preview
        </div>
      </div>
    </div>
  );
};

export default InputArea;
