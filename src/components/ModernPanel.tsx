import { motion } from "framer-motion";
import PipelineStage from "./PipelineStage";
import FlowArrow from "./FlowArrow";
import TransformerBlock from "./TransformerBlock";
import QKVProjection from "./QKVProjection";
import ResidualConnection from "./ResidualConnection";
import { tokenize, getTokenId, getEmbeddingValues, getAttentionWeights, getOutputProbs } from "@/lib/tokenizer";
import { useMemo } from "react";

interface ModernPanelProps {
  text: string;
}

const ModernPanel = ({ text }: ModernPanelProps) => {
  const tokens = useMemo(() => tokenize(text), [text]);
  const hasInput = tokens.length > 0;
  const tokenIds = useMemo(() => tokens.map(getTokenId), [tokens]);
  const embeddings = useMemo(() => tokenIds.map(id => getEmbeddingValues(id)), [tokenIds]);
  const attentionWeights = useMemo(() => getAttentionWeights(tokens.length), [tokens]);
  const outputProbs = useMemo(() => getOutputProbs(), [tokens]);

  const activeStage = hasInput ? 8 : 0;

  return (
    <div className="h-full bg-modern-bg overflow-y-auto">
      <div className="px-6 py-5">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="font-modern text-xl font-bold text-modern-foreground tracking-tight">
            Modern Transformer
          </h2>
          <p className="text-[11px] text-muted-foreground font-modern mt-1">
            LLaMA, GPT-4, Gemini — 2023–2025
          </p>
        </div>

        <div className="space-y-0">
          {/* 1. Tokenization */}
          <PipelineStage
            label="Tokenize"
            sublabel="Subword BPE"
            colorVar="tokenize"
            isActive={activeStage >= 1}
            delay={0}
            tooltip="Same tokenization as classic — subword BPE splitting"
          >
            <div className="flex flex-wrap gap-1.5">
              {tokens.map((t, i) => (
                <motion.span
                  key={`${t}-${i}`}
                  className="animate-token-slide inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stage-tokenize/10 text-xs font-modern font-medium"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {t}
                  <span className="text-[9px] text-muted-foreground">#{tokenIds[i]}</span>
                </motion.span>
              ))}
              {!hasInput && <span className="text-xs text-muted-foreground font-modern">Awaiting input...</span>}
            </div>
          </PipelineStage>

          <FlowArrow isActive={activeStage >= 1} delay={0.5} />

          {/* 2. Embedding */}
          <PipelineStage
            label="Embedding"
            sublabel="Lookup Table"
            colorVar="tokenize"
            isActive={activeStage >= 2}
            delay={1}
            tooltip="Token IDs mapped to dense vectors — same as classic"
          >
            <div className="space-y-1">
              {embeddings.slice(0, 4).map((emb, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground w-12 truncate font-modern font-medium">{tokens[i]}</span>
                  <div className="flex gap-px flex-1">
                    {emb.map((v, j) => (
                      <div
                        key={j}
                        className="h-3 flex-1 rounded-sm"
                        style={{ backgroundColor: `hsl(239, 84%, ${40 + v * 40}%)`, opacity: 0.7 + v * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {tokens.length > 4 && <span className="text-[9px] text-muted-foreground">+{tokens.length - 4} more</span>}
            </div>
          </PipelineStage>

          <FlowArrow isActive={activeStage >= 2} delay={1.5} />

          {/* TRANSFORMER BLOCK */}
          <TransformerBlock isActive={activeStage >= 3} delay={2} variant="modern">
            {/* 3. PRE-NORM before Attention */}
            <PipelineStage
              label="PRE-NORM"
              sublabel="RMSNorm"
              colorVar="norm"
              isActive={activeStage >= 3}
              delay={2}
              tooltip="RMSNorm applied BEFORE attention (pre-norm). Simpler than LayerNorm — no mean subtraction"
            >
              <div className="flex items-center gap-2 text-[10px] font-modern">
                <span className="px-2 py-1 rounded-md bg-stage-norm/10 text-stage-norm font-semibold">RMSNorm</span>
                <span className="text-muted-foreground">→ then Attention</span>
              </div>
            </PipelineStage>

            <FlowArrow isActive={activeStage >= 3} delay={2.5} />

            {/* 4. RoPE */}
            <PipelineStage
              label="Rotary Positional Embedding (RoPE)"
              sublabel="Relative"
              colorVar="position"
              isActive={activeStage >= 4}
              delay={3}
              tooltip="Rotary Position Embeddings: rotates Q/K vectors in complex plane for relative position encoding"
            >
              <div className="flex items-center gap-3">
                {tokens.slice(0, 5).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <motion.div
                      className="w-5 h-5 border-2 border-stage-position/50 rounded-full flex items-center justify-center"
                      animate={hasInput ? { rotate: i * 45 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-stage-position" />
                    </motion.div>
                    <span className="text-[7px] text-muted-foreground mt-0.5 font-modern">θ{i}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-muted-foreground font-modern mt-1">
                Rotates query and key vectors to encode relative position.
              </p>
              <p className="text-[8px] text-muted-foreground font-modern">
                q·e<sup>iθ</sup> — applied inside attention to Q and K
              </p>
            </PipelineStage>

            <FlowArrow isActive={activeStage >= 4} delay={3.5} />

            {/* 5. GQA with Residual */}
            <ResidualConnection isActive={activeStage >= 5} delay={4} label="+ Residual">
              <PipelineStage
                label="Grouped-Query Attention (GQA)"
                sublabel=""
                colorVar="attention"
                isActive={activeStage >= 5}
                delay={4}
                tooltip="Multiple query heads share fewer K/V heads — reduces memory & compute"
              >
                {/* Q/K/V Projection */}
                <QKVProjection isActive={activeStage >= 5} delay={4} variant="modern" />

                {/* GQA Groups */}
                <div className="space-y-1.5 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1].map(group => (
                      <div key={group} className="rounded-md border border-stage-attention/20 p-1.5 bg-stage-attention/5">
                        <div className="text-[7px] text-stage-attention font-semibold mb-1 font-modern">KV Group {group + 1}</div>
                        <div className="flex gap-0.5">
                          {[0, 1, 2, 3].map(q => (
                            <div key={q} className="flex-1 h-4 rounded-sm bg-stage-attention/20 flex items-center justify-center">
                              <span className="text-[6px] text-stage-attention">Q{group * 4 + q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[8px] text-muted-foreground font-modern">8 Query Heads → 2 KV Groups (4:1 ratio)</p>
                  <p className="text-[7px] text-muted-foreground font-modern italic">GQA reduces memory usage during inference.</p>
                </div>

                {hasInput && tokens.length > 1 && (
                  <div className="mt-2 flex gap-px">
                    {attentionWeights[0]?.slice(0, Math.min(tokens.length, 6)).map((w, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-sm"
                        style={{ height: `${Math.max(4, w * 24)}px`, backgroundColor: `hsl(145, 60%, ${35 + w * 30}%)` }}
                      />
                    ))}
                  </div>
                )}
              </PipelineStage>
            </ResidualConnection>

            <FlowArrow isActive={activeStage >= 5} delay={4.5} />

            {/* 6. PRE-NORM before FFN */}
            <PipelineStage
              label="PRE-NORM"
              sublabel="RMSNorm"
              colorVar="norm"
              isActive={activeStage >= 6}
              delay={5}
              tooltip="RMSNorm applied before the feed-forward sublayer"
            >
              <div className="flex items-center gap-2 text-[10px] font-modern">
                <span className="px-2 py-1 rounded-md bg-stage-norm/10 text-stage-norm font-semibold">RMSNorm</span>
                <span className="text-muted-foreground">→ then FFN</span>
              </div>
            </PipelineStage>

            <FlowArrow isActive={activeStage >= 6} delay={5.2} />

            {/* 7. Feed-Forward SwiGLU with Residual */}
            <ResidualConnection isActive={activeStage >= 6} delay={5.5} label="+ Residual">
              <PipelineStage
                label="Feed-Forward"
                sublabel="SwiGLU Activation"
                colorVar="ffn"
                isActive={activeStage >= 6}
                delay={5.5}
                tooltip="Gated Linear Unit with Swish activation — better gradient flow than ReLU"
              >
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="flex-1 h-5 rounded-md bg-stage-ffn/10 border border-stage-ffn/20 flex items-center justify-center">
                    <span className="text-[8px] text-stage-ffn font-medium font-modern">Linear → Swish ⊙ Gate → Linear</span>
                  </div>
                </div>
                <svg viewBox="0 0 60 20" className="w-16 h-5 mt-1">
                  <path d="M0,18 C15,18 20,2 30,6 C40,10 45,2 60,2" fill="none" stroke="hsl(35, 90%, 55%)" strokeWidth="1.5" />
                  <text x="30" y="18" fontSize="5" fill="hsl(35, 90%, 55%)" textAnchor="middle" fontFamily="Inter">SwiGLU</text>
                </svg>
              </PipelineStage>
            </ResidualConnection>
          </TransformerBlock>

          <FlowArrow isActive={activeStage >= 7} delay={6} />

          {/* 8. KV Cache */}
          <PipelineStage
            label="KV Cache"
            sublabel="Generation Optimization"
            colorVar="cache"
            isActive={activeStage >= 7}
            delay={6.5}
            tooltip="Past keys/values are cached and reused for efficient autoregressive generation"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-modern">
                {tokens.slice(0, 4).map((_, i) => (
                  <div
                    key={i}
                    className="px-1.5 py-1 rounded bg-stage-cache/10 border border-stage-cache/20 text-[8px] text-stage-cache font-medium"
                  >
                    K<sub>{i + 1}</sub> V<sub>{i + 1}</sub>
                  </div>
                ))}
                <svg width="20" height="12" viewBox="0 0 20 12" className="shrink-0">
                  <path d="M2,6 L14,6" stroke="hsl(var(--stage-cache))" strokeWidth="1.5" fill="none" />
                  <polygon points="14,3 18,6 14,9" fill="hsl(var(--stage-cache))" />
                </svg>
                <span className="text-[8px] text-muted-foreground italic">reuse</span>
              </div>
              <p className="text-[7px] text-muted-foreground font-modern leading-relaxed">
                Stores previously computed Key and Value vectors so attention does not recompute them during autoregressive generation.
              </p>
            </div>
          </PipelineStage>

          <FlowArrow isActive={activeStage >= 7} delay={7} />

          {/* 9. Output */}
          <PipelineStage
            label="Output Logits → Softmax → Token Probabilities"
            sublabel=""
            colorVar="output"
            isActive={activeStage >= 8}
            delay={7}
            tooltip="Final linear projection + softmax to get next-token probabilities"
          >
            <div className="text-[9px] text-muted-foreground font-modern mb-2 space-y-0.5">
              <p>Hidden State → Linear Projection (vocab size) → Softmax → Probabilities</p>
            </div>
            <div className="space-y-1">
              {hasInput && outputProbs.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] w-8 text-right font-modern font-medium text-muted-foreground">{p.token}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, hsl(239, 84%, 67%), hsl(260, 60%, 55%))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${p.prob * 100}%` }}
                      transition={{ duration: 0.4, delay: 0.9 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground w-8">{(p.prob * 100).toFixed(1)}%</span>
                </div>
              ))}
              {!hasInput && <span className="text-xs text-muted-foreground font-modern">No output yet</span>}
            </div>
          </PipelineStage>
        </div>
      </div>
    </div>
  );
};

export default ModernPanel;
