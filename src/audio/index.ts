import { generateSegmentVoiceovers, FishAudioOptions, estimateTTSCost } from './tts';
import { VideoScript } from '../shared/types';
import { loadConfig } from '../credits/config';

export { generateVoiceover, estimateTTSCost } from './tts';

/**
 * Generates all voiceover audio for a complete video script using Fish Audio.
 * Returns paths to the individual audio files for each segment.
 */
export async function generateAudio(script: VideoScript, outputDir: string): Promise<string[]> {
  const config = loadConfig();

  const fishOptions: FishAudioOptions = {
    voiceId: process.env.FISH_AUDIO_VOICE_ID || (config as any).FISH_AUDIO_VOICE_ID,
    model: 's2.1-pro',
  };

  // Build total voiceover text for cost estimation
  const allText = script.segments.map(s => s.voiceover).filter(Boolean).join(' ');
  const estimatedCost = estimateTTSCost(allText);
  console.log(`\n  💰 Estimated TTS cost: $${estimatedCost.toFixed(4)} (Fish Audio)`);

  const audioPaths = await generateSegmentVoiceovers(script.segments, outputDir, fishOptions);
  return audioPaths;
}
