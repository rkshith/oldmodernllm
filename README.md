# Transformer Architecture Visualizer

An interactive tool to **visualize how transformers process text**, while comparing the **original 2017 Transformer architecture** with **modern LLM transformer designs**.

The goal of this project is to help developers, students, and researchers **see how tokens move through a transformer model**.

---

## Live Demo

https://attention-amber.vercel.app

Enter any prompt and watch how it flows through the transformer pipeline.

---

# What This Tool Shows

The visualization demonstrates how text moves through the core stages of a transformer.


Input Text
↓
Tokenization
↓
Embedding
↓
Positional Encoding
↓
Attention
↓
Feed Forward
↓
Output Probabilities


Each stage is shown as a block so you can understand how tokens change step by step.

---

# Architecture Comparison

The interface shows two pipelines side-by-side:

- **Classic Transformer (2017)**
- **Modern LLM Transformer**

This helps visualize how transformer design evolved over time.

---

# Classic Transformer (2017)

Based on the paper **"Attention Is All You Need"**.

### Tokenization
Breaks text into smaller pieces (tokens) that the model can process.

### Embedding
Converts each token into a numerical vector representing its meaning.

### Sinusoidal Positional Encoding
Adds position information so the model knows the order of words.

### Multi-Head Attention
Allows each token to look at other tokens to understand context.

### Residual Connection
Keeps the original information while adding new information from the layer.

### LayerNorm (Post-Norm)
Normalizes activations after each block to stabilize training.

### Feed Forward (ReLU)
Applies a small neural network to refine each token representation.

---

# Modern LLM Transformer

Used in models like **LLaMA, Mistral, and many modern LLMs**.

### Tokenization
Same idea: convert text into tokens the model understands.

### Embedding
Transforms tokens into dense vectors used by the model.

### Rotary Positional Embedding (RoPE)
Encodes token position by rotating vectors instead of adding sinusoidal signals.

### RMSNorm (Pre-Norm)
Normalizes inputs before each block to improve training stability.

### Grouped Query Attention (GQA)
Shares key/value heads across attention groups to reduce memory usage.

### Residual Connection
Combines new information with the original input to preserve context.

### SwiGLU Feed Forward
A gated feed-forward network that improves model capacity and stability.

### KV Cache
Stores previous attention states to make generation faster.

---

# Features

- Visual comparison of **classic vs modern transformer architectures**
- Interactive **token flow visualization**
- Minimal interface focused on **understanding model internals**
- Educational tool for learning transformer mechanics

---

# Tech Stack

Frontend
- React
- TypeScript
- Vite

UI
- TailwindCSS
- shadcn/ui

Deployment
- Vercel

---

# Why This Project Exists

Transformers power most modern AI systems, but their internal mechanics are often difficult to understand.

This project makes it easier to **see what happens inside the model** by visualizing each stage of the transformer pipeline.

---

# Future Improvements

- Attention map visualization
- Step-by-step transformer execution
- Token probability heatmaps
- Integration with small real transformer models

---

# License

MIT License