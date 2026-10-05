import chalk from 'chalk';
import ora from 'ora';
import { VideoScript, GeneratedFootage, VideoGenerateOptions } from '../shared/types';
import { HiggsfieldProvider } from './providers/higgsfield';
import { getApiKey } from '../credits/config';

export async function generateFootage(script: VideoScript, options: VideoGenerateOptions): Promise<GeneratedFootage[]> {
  const apiKey = getApiKey('HF_API_KEY') || 'mock_key'; // Using HF key alias or fallback for Higgsfield in this prototype
  
  if (!apiKey && !options.dryRun) {
    console.log(chalk.yellow('\n⚠️  No HIGGSFIELD_API_KEY found. Using mock generation mode.'));
    console.log(chalk.gray('Run: reproreel config set HIGGSFIELD_API_KEY=your_key\n'));
  }

  const provider = new HiggsfieldProvider(apiKey);
  const footageList: GeneratedFootage[] = [];

  for (let i = 0; i < script.segments.length; i++) {
    const segment = script.segments[i];
    const duration = segment.endSeconds - segment.startSeconds;
    
    const footagePath = await provider.generate(segment.visualPrompt);
    
    footageList.push({
      segmentIndex: i,
      localPath: footagePath,
      durationSeconds: duration,
      provider: provider.name,
      cost: duration * 0.05 // Example: 5 cents per second
    });
  }

  return footageList;
}
