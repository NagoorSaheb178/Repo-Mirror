# Repository Mirror (GitGrade)

A high-performance AI code auditor powered by Google Gemini 2.5 Flash.

## Overview
This application provides a "harsh but fair" professional evaluation of GitHub repositories. It uses a modern Bento Grid UI, terminal-style feedback, and radar chart visualizations to present complex analysis data in a consolidated dashboard.

## 🛠 Tech Stack

### Core Architecture
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

### Artificial Intelligence
- **Model:** Google Gemini 2.5 Flash
- **SDK:** `@google/genai` (Latest Google GenAI SDK)
- **Capabilities:** Multimodal analysis, System Instructions, Google Search Grounding

### UI & Visualization
- **Charts:** [Recharts](https://recharts.org/) (Custom Radar/Spider Charts)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Design:** Glassmorphism, Bento Grid Layout, CSS Animations

### Infrastructure
- **Deployment:** Vercel
- **Environment:** Node.js / Edge Runtime compatible

## Deployment

This project is optimized for **Vercel**.

**Requirement:**
Add the following Environment Variable in your Vercel Project Settings:
- `NEXT_PUBLIC_API_KEY`: Your Google Gemini API Key.

## Features
- **Scorecard**: 0-100 simplified rating with difficulty classification.
- **Metrics**: Interactive Radar chart for quality, structure, and testing.
- **Roadmap**: AI-generated actionable steps for improvement.
- **Grounding**: Real-time Google Search verification for repository context.

## License
MIT