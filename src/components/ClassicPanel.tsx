import { motion } from "framer-motion";
import PipelineStage from "./PipelineStage";
import FlowArrow from "./FlowArrow";
import TransformerBlock from "./TransformerBlock";
import QKVProjection from "./QKVProjection";
import ResidualConnection from "./ResidualConnection";
import { tokenize, getTokenId, getEmbeddingValues, getAttentionWeights, getOutputProbs } from "@/lib/tokenizer";
import { useMemo } from "react";

interface ClassicPanelProps {
  text: string;
}

const ClassicPanel = ({ text }: ClassicPanelProps) => {
  const tokens = useMemo(() => tokenize(text), [text]);
  const hasInput = tokens.length > 0;
  const tokenIds = useMemo(() => tokens.map(getTokenId), [tokens]);
  const embeddings = useMemo(() => tokenIds.map(id => getEmbeddingValues(id)), [tokenIds]);
  const attentionWeights = useMemo(() => getAttentionWeights(tokens.length), [tokens]);
  const outputProbs = useMemo(() => getOutputProbs(), [tokens]);

  const activeStage = hasInput ? 7 : 0;

  return (
    <div className="h-full bg-classic-bg border-r border-border overflow-y-auto">
      <div className="px-6 py-5">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="font-classic text-xl font-bold text-classic-foreground tracking-tight">
            Classic Transformer
          </h2>
          <p className="text-[11px] text-muted-foreground font-classic italic mt-1">
            "Attention Is All You Need" — 2017
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
            tooltip="Text is split into subword tokens using Byte-Pair Encoding"
          >
            <div className="flex flex-wrap gap-1.5">
              {tokens.map((t, i) => (
                <motion.span
                  key={`${t}-${i}`}
                  className="animate-token-slide inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stage-tokenize/10 text-xs font-classic"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <span className="font-medium">{t}</span>
                  <span className="text-[9px] text-muted-foreground">#{tokenIds[i]}</span>
                </motion.span>
              ))}
              {!hasInput && <span className="text-xs text-muted-foreground italic font-classic">Awaiting input...</span>}
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
            tooltip="Each token ID is mapped to a dense vector via an embedding table"
          >
            <div className="space-y-1">
              {embeddings.slice(0, 4).map((emb, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[9px] text-muted-foreground w-12 truncate font-classic">{tokens[i]}</span>
                  <div className="flex gap-px flex-1">
                    {emb.map((v, j) => (
                      <div
                        key={j}
                        className="h-3 flex-1 rounded-sm"
                        style={{ backgroundColor: `hsl(210, 80%, ${30 + v * 50}%)`, opacity: 0.7 + v * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {tokens.length > 4 && <span className="text-[9px] text-muted-foreground">+{tokens.length - 4} more</span>}
            </div>
          </PipelineStage>

          <FlowArrow isActive={activeStage >= 2} delay={1.5} />

          {/* 3. Positional Encoding - Sinusoidal */}
          <PipelineStage
            label="Sinusoidal Positional Encoding"
            sublabel="Absolute"
            colorVar="position"
            isActive={activeStage >= 3}
            delay={2}
            tooltip="Absolute sinusoidal position encodings are added to each embedding"
          >
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 120 30" className="w-full h-8">
                {tokens.slice(0, 6).map((_, i) => (
                  <g key={i}>
                    <path
                      d={`M${i * 20 + 2},25 Q${i * 20 + 7},${5 + Math.sin(i * 1.2) * 10} ${i * 20 + 12},15 T${i * 20 + 22},${15 + Math.cos(i * 0.8) * 8}`}
                      fill="none"
                      stroke="hsl(280, 65%, 55%)"
                      strokeWidth="1.5"
                      opacity={0.6 + i * 0.05}
                    />
                    <text x={i * 20 + 8} y={29} fontSize="6" fill="hsl(280, 65%, 55%)" textAnchor="middle" fontFamily="Georgia">
                      p{i}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="text-[8px] text-muted-foreground font-classic mt-1 space-y-0.5">
              <p>PE(pos,2i) = sin(pos / 10000<sup>2i/d</sup>)</p>
              <p>PE(pos,2i+1) = cos(pos / 10000<sup>2i/d</sup>)</p>
            </div>
          </PipelineStage>

          <FlowArrow isActive={activeStage >= 3} delay={2.5} />

          {/* TRANSFORMER BLOCK */}
          <TransformerBlock isActive={activeStage >= 4} delay={3} variant="classic">
            {/* 4. Multi-Head Attention with Q/K/V */}
            <ResidualConnection isActive={activeStage >= 4} delay={3} label="+ Residual">
              <PipelineStage
                label="Multi-Head Attention (MHA)"
                sublabel="Full Q/K/V per head"
                colorVar="attention"
                isActive={activeStage >= 4}
                delay={3}
                tooltip="Each head independently computes Query-Key-Value attention"
              >
                {/* Q/K/V Projection */}
                <QKVProjection isActive={activeStage >= 4} delay={3} variant="classic" />

                {/* Heads */}
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {[0, 1, 2, 3].map(head => (
                    <div key={head} className="text-center">
                      <div className="text-[7px] text-muted-foreground mb-0.5 font-classic">Head {head + 1}</div>
                      <div className="h-5 rounded-sm bg-stage-attention/15 border border-stage-attention/30 flex items-center justify-center">
                        <span className="text-[6px] font-medium text-stage-attention">Q·K·V</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[8px] text-muted-foreground font-classic mt-1">Each head has independent Q, K, V projections</p>

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

            <FlowArrow isActive={activeStage >= 4} delay={3.5} />

            {/* 5. POST-NORM LayerNorm (after attention) */}
            <PipelineStage
              label="POST-NORM"
              sublabel="LayerNorm"
              colorVar="norm"
              isActive={activeStage >= 5}
              delay={4}
              tooltip="LayerNorm is applied AFTER the attention sublayer and residual add (post-norm)"
            >
              <div className="flex items-center gap-2 text-[10px] font-classic">
                <span className="px-2 py-1 rounded bg-stage-attention/10 text-stage-attention">Attn + Residual</span>
                <span className="text-muted-foreground">→</span>
                <span className="px-2 py-1 rounded bg-stage-norm/10 text-stage-norm font-semibold">LayerNorm</span>
              </div>
            </PipelineStage>

            <FlowArrow isActive={activeStage >= 5} delay={4.5} />

            {/* 6. Feed-Forward with Residual */}
            <ResidualConnection isActive={activeStage >= 6} delay={5} label="+ Residual">
              <PipelineStage
                label="Feed-Forward"
                sublabel="ReLU Activation"
                colorVar="ffn"
                isActive={activeStage >= 6}
                delay={5}
                tooltip="Two-layer MLP with ReLU activation function"
              >
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="flex-1 h-5 rounded bg-stage-ffn/10 border border-stage-ffn/20 flex items-center justify-center">
                    <span className="text-[8px] text-stage-ffn font-medium font-classic">Linear → ReLU → Linear</span>
                  </div>
                </div>
                <svg viewBox="0 0 60 20" className="w-16 h-5 mt-1">
                  <polyline points="0,18 30,18 30,2 60,2" fill="none" stroke="hsl(35, 90%, 55%)" strokeWidth="1.5" />
                  <text x="30" y="14" fontSize="5" fill="hsl(35, 90%, 55%)" textAnchor="middle" fontFamily="Georgia">ReLU</text>
                </svg>
              </PipelineStage>
            </ResidualConnection>

            <FlowArrow isActive={activeStage >= 6} delay={5.5} />

            {/* POST-NORM after FFN */}
            <PipelineStage
              label="POST-NORM"
              sublabel="LayerNorm"
              colorVar="norm"
              isActive={activeStage >= 6}
              delay={5.5}
              tooltip="LayerNorm applied after FFN sublayer and residual add"
            >
              <div className="flex items-center gap-2 text-[10px] font-classic">
                <span className="px-2 py-1 rounded bg-stage-ffn/10 text-stage-ffn">FFN + Residual</span>
                <span className="text-muted-foreground">→</span>
                <span className="px-2 py-1 rounded bg-stage-norm/10 text-stage-norm font-semibold">LayerNorm</span>
              </div>
            </PipelineStage>
          </TransformerBlock>

          <FlowArrow isActive={activeStage >= 6} delay={6} />

          {/* 7. Output */}
          <PipelineStage
            label="Output Logits → Softmax → Token Probabilities"
            sublabel=""
            colorVar="output"
            isActive={activeStage >= 7}
            delay={6}
            tooltip="Final linear projection + softmax to get token probabilities"
          >
            <div className="text-[9px] text-muted-foreground font-classic mb-2 space-y-0.5">
              <p>Hidden State → Linear Projection (vocab size) → Softmax → Probabilities</p>
            </div>
            <div className="space-y-1">
              {hasInput && outputProbs.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] w-8 text-right font-classic text-muted-foreground">{p.token}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-stage-output/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${p.prob * 100}%` }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground w-8">{(p.prob * 100).toFixed(1)}%</span>
                </div>
              ))}
              {!hasInput && <span className="text-xs text-muted-foreground italic font-classic">No output yet</span>}
            </div>
          </PipelineStage>
        </div>
      </div>
    </div>
  );
};

export default ClassicPanel;
