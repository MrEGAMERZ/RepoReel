import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

/**
 * Fish Audio TTS Integration
 * 
 * Fish Audio (https://fish.audio) is a high-quality AI text-to-speech provider
 * that supports:
 *  - 83+ languages
 *  - 3000+ community voice models (pick any voice from their library)
 *  - Instant voice cloning (provide a 10-second audio sample → clone it)
 *  - Multi-speaker dialogue
 *  - WebSocket streaming for real-time use
 * 
 * Pricing: ~$15 per 1M UTF-8 input bytes (~$0.015 per 1000 characters)
 * A 60-second voiceover script is roughly 900 characters = ~$0.014
 * 
 * API Docs: https://docs.fish.audio
 * Get API Key: https://fish.audio/go-api/
 */

const FISH_AUDIO_API = 'https://api.fish.audio/v1/tts';

export interface FishAudioOptions {
  voiceId?: string;         // A pre-uploaded voice model ID from fish.audio
  model?: 'speech-1.6' | 's2.1-pro' | 's2.1-pro-free'; // s2.1-pro for production quality
  referenceAudioPath?: string; // Path to your own .wav/.mp3 to clone (zero-shot mode)
}

export async function generateVoiceover(
  text: string,
  outputPath: string,
  options: FishAudioOptions = {}
): Promise<string> {
  const apiKey = process.env.FISH_AUDIO_API_KEY;
  if (!apiKey) {
    throw new Error(
      'FISH_AUDIO_API_KEY is not set.\n' +
      'Get your key at https://fish.audio/go-api/\n' +
      'Then run: ./reporeel config set FISH_AUDIO_API_KEY=your_key'
    );
  }

  const {
    voiceId,
    model = 's2.1-pro',
  } = options;

  console.log(chalk.gray(`  🎙️  Generating voiceover (Fish Audio / ${model})...`));

  if (!voiceId) {
    console.log(chalk.yellow(
      '  ⚠️  No VOICE_ID set. Using Fish Audio default voice.\n' +
      '  Tip: Browse voices at https://fish.audio and set:\n' +
      '  ./reporeel config set FISH_AUDIO_VOICE_ID=<id>'
    ));
  }

  const requestBody: Record<string, unknown> = {
    text,
    model,
    ...(voiceId ? { reference_id: voiceId } : {}),
  };

  const response = await fetch(FISH_AUDIO_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Fish Audio API error ${response.status}: ${error}`);
  }

  // Response is the raw audio bytes (mp3)
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = Buffer.from(arrayBuffer);
  
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, audioBuffer);

  console.log(chalk.green(`  ✅ Voiceover saved to ${outputPath}`));
  return outputPath;
}

/**
 * Generate voiceover for each script segment, saving individual audio clips
 * that can be stitched together by the FFmpeg editor.
 */
export async function generateSegmentVoiceovers(
  segments: Array<{ voiceover: string; startSeconds: number }>,
  outputDir: string,
  options: FishAudioOptions = {}
): Promise<string[]> {
  const audioPaths: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment.voiceover?.trim()) {
      audioPaths.push(''); // silent segment
      continue;
    }

    const outputPath = path.join(outputDir, `voiceover-segment-${i}.mp3`);
    const filePath = await generateVoiceover(segment.voiceover, outputPath, options);
    audioPaths.push(filePath);
  }

  return audioPaths;
}

/**
 * Estimate cost for a given script in USD.
 * Fish Audio charges ~$15 per 1M UTF-8 bytes.
 */
export function estimateTTSCost(text: string): number {
  const bytes = Buffer.byteLength(text, 'utf8');
  return (bytes / 1_000_000) * 15;
}
