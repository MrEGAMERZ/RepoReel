import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RepoContext, VideoFormat, VideoScript } from '../shared/types';
import { getApiKey } from '../credits/config';

export async function generateScript(context: RepoContext, format: VideoFormat): Promise<VideoScript> {
  const apiKey = getApiKey('GEMINI_API_KEY');
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set. Run: reproreel config set GEMINI_API_KEY=your_key');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Upgrade to Gemini 2.0 Pro for superior storytelling, pacing, and avoiding "AI slop" buzzwords.
  // We allow an override via environment variable, but default to the highest EQ model for the script.
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.0-pro-exp';
  const model = genAI.getGenerativeModel({ model: modelName, generationConfig: { responseMimeType: 'application/json' } });

  // Read the skill file for the requested format
  const skillPath = path.join(process.cwd(), 'skills', `${format}.md`);
  let skillContent = '';
  if (fs.existsSync(skillPath)) {
    skillContent = fs.readFileSync(skillPath, 'utf8');
  } else {
    throw new Error(`Format skill '${format}' not found at ${skillPath}`);
  }

  const prompt = `
You are an expert technical product marketer and video producer.
Your task is to write a highly engaging video script based on a GitHub repository's context and a specific video format's guidelines.

### Video Format Guidelines (SKILL.md):
${skillContent}

### Repository Context:
Name: ${context.name}
Description: ${context.description}
Tech Stack: ${context.techStack.join(', ')}
Key Features:
${context.features.map(f => `- ${f}`).join('\n')}

Generate a JSON object representing the video script. The JSON must follow this exact schema:
{
  "totalDurationSeconds": number,
  "voiceStyle": string,
  "segments": [
    {
      "startSeconds": number,
      "endSeconds": number,
      "voiceover": "Spoken text",
      "onScreenText": "Short punchy text to display (optional)",
      "visualPrompt": "Detailed prompt for an AI video generator (e.g. Wan/Runway) describing the visual scene"
    }
  ]
}

Ensure the segments add up to the exact duration specified in the format guidelines.
Ensure the visualPrompts are descriptive, cinematic, and focus on developer aesthetics.
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text) as VideoScript;
  } catch (error: any) {
    throw new Error(`Failed to generate script via LLM: ${error.message}`);
  }
}
