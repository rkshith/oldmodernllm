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

## 🏗️ Architecture Variants at a Glance

A side-by-side breakdown of the original architecture versus what powers today's state-of-the-art models.

<div align="center">

| Component | 🏛️ Classic Transformer (2017) | 🚀 Modern LLM Transformer |
| :--- | :--- | :--- |
| **Origin** | *Based on **"Attention Is All You Need"*** | *Powering **LLaMA, Mistral, & Modern LLMs*** |
| **Tokenization** | Breaks text into smaller pieces (tokens). | Same idea: convert text into tokens. |
| **Embedding** | Converts tokens into numerical vectors. | Transforms tokens into dense vectors. |
| **Positional Encoding** | **Sinusoidal Positional Encoding**<br>Adds position info so the model knows word order. | **Rotary Positional Embedding (RoPE)**<br>Encodes position by rotating vectors. |
| **Normalization** | **LayerNorm (Post-Norm)**<br>Normalizes activations *after* each block. | **RMSNorm (Pre-Norm)**<br>Normalizes inputs *before* each block for stability. |
| **Attention Mechanism**| **Multi-Head Attention**<br>Each token looks at other tokens for context. | **Grouped Query Attention (GQA)**<br>Shares key/value heads to save memory. |
| **Feed Forward** | **ReLU Feed Forward**<br>A small neural network refines each token. | **SwiGLU Feed Forward**<br>Gated network for better capacity & stability. |
| **Residual Connections**| Keeps original info while adding new info. | Combines new info with original input. |
| **Generation Speedup** | *(Standard Decoding)* | **KV Cache**<br>Stores attention states for faster generation. |

</div>

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