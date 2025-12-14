# Repository Mirror (GitGrade)

> The AI-powered code auditor. Get a harsh, honest evaluation of your GitHub projects.

Repository Mirror is an advanced React application that uses Google's Gemini 2.5 Flash AI model to perform deep-dive analysis of GitHub repositories. It provides a real-time, terminal-styled audit of code quality, structure, and documentation, offering a professional score and actionable roadmap for improvement.

## Features

*   **AI-Powered Analysis**: Utilizes `gemini-2.5-flash` for comprehensive code reviews.
*   **Bento Grid Layout**: A modern, high-end responsive dashboard design.
*   **Real-time Simulation**: Terminal-style loading states for an immersive experience.
*   **Visual Metrics**: Radar charts and progress bars to visualize repository health.
*   **Actionable Roadmaps**: Generated step-by-step guides to improve the codebase.
*   **Google Search Grounding**: Verifies repository context using live search data.

## Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS, Glassmorphism effects
*   **AI Integration**: `@google/genai` SDK
*   **Visualization**: `recharts` for data visualization
*   **Icons**: `lucide-react`
*   **Build Tool**: Vite (implied by ES modules structure)

## Getting Started

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set your API Key:
    *   This project requires a Google GenAI API Key.
    *   Set `process.env.API_KEY` in your environment variables.
4.  Run the development server.

## Project Structure

*   `App.tsx`: Main application controller and layout.
*   `services/geminiService.ts`: AI interaction logic with structured JSON extraction.
*   `components/`: Reusable UI components (ScoreCard, MetricsChart, Roadmap, etc.).
*   `types.ts`: TypeScript definitions for the analysis data model.

## Design Philosophy

The UI is built with a "Cyber/Pro" aesthetic in mind:
*   **Dark Mode Only**: Optimized for developer environments.
*   **Glassmorphism**: Subtle translucency and blurs.
*   **Monospace Typography**: Using `JetBrains Mono` for data and technical details.
*   **Grid Systems**: Bento-box style layout for organized information density.

## License

MIT
