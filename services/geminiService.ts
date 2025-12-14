import { GoogleGenAI } from "@google/genai";
import { RepoAnalysis } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Repository Mirror", an elite AI code auditor and career mentor. 
Your task is to analyze GitHub repositories to provide a harsh but fair professional evaluation.
You must use the Google Search tool to find information about the provided repository URL if you cannot access it directly, or infer structure from standard patterns if the URL is well-known or detailed in the prompt.

Analyze based on these dimensions:
1. Code Quality & Readability (Linting, complexity, naming)
2. Project Structure (Organization, separation of concerns)
3. Documentation (README, comments, wiki)
4. Testing (Coverage, presence of CI/CD)
5. Consistency (Commits, version control)
6. Real-world Relevance (Modern stack, utility)

OUTPUT FORMAT:
Return a raw JSON object. Do not wrap it in markdown code blocks. Do not include any conversational text, warnings, or disclaimers outside the JSON object.
The JSON must strictly match this structure:
{
  "score": number (0-100),
  "level": "Beginner" | "Intermediate" | "Advanced" | "Elite",
  "summary": string,
  "metrics": [ { "name": string, "score": number, "fullMark": number } ],
  "roadmap": [ { "title": string, "description": string, "priority": "High" | "Medium" | "Low" } ],
  "techStack": string[],
  "strengths": string[],
  "weaknesses": string[]
}
`;

export const analyzeRepository = async (repoUrl: string): Promise<RepoAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Analyze the GitHub repository at this URL: ${repoUrl}
    
    If the repository is real and public, search for its details, readme content, and structure.
    If it is a hypothetical example or you cannot find it, perform a best-effort analysis based on what a repository with that name/context usually contains, but strictly flag it in the summary if you are making assumptions.
    
    Provide:
    1. A simplified overall score (0-100).
    2. A difficulty level (Beginner, Intermediate, Advanced, Elite).
    3. A professional executive summary (2-3 sentences).
    4. Key metrics (0-10 scale) for: Code Quality, Documentation, Structure, Testing, Innovation.
    5. A personalized roadmap of 3-5 actionable steps to improve the repo.
    6. Detected Tech Stack.
    7. Top 3 Strengths and Top 3 Weaknesses.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are NOT supported with tools in gemini-2.5-flash currently for this specific combination or library version logic.
        // We rely on the prompt to enforce JSON.
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    // Robust JSON extraction: Find the first '{' and last '}'
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
       throw new Error("AI response did not contain a valid JSON object.");
    }

    const cleanedText = text.substring(firstBrace, lastBrace + 1);
    
    let analysisData: RepoAnalysis;
    try {
      analysisData = JSON.parse(cleanedText) as RepoAnalysis;
    } catch (e) {
      console.error("Failed to parse JSON", cleanedText);
      throw new Error("AI response was not valid JSON. Please try again.");
    }

    // Extract grounding chunks (Sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter(chunk => chunk.web?.uri && chunk.web?.title)
      .map(chunk => ({
        title: chunk.web!.title!,
        uri: chunk.web!.uri!
      }));

    return { ...analysisData, sources };

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    throw new Error(error.message || "Failed to analyze repository.");
  }
};