import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { generateFootage } from '../../footage';
import { generateAudio } from '../../audio';
import { compileVideo } from '../../editor';
import { VideoScript, VideoGenerateOptions } from '../../shared/types';

export async function renderCommand(scriptPath: string) {
  console.log(chalk.blue.bold(`\n🎬 RepoReel - Agent-Native Render Mode`));
  
  const targetPath = path.resolve(process.cwd(), scriptPath);
  if (!fs.existsSync(targetPath)) {
    console.error(chalk.red(`Error: Script file not found at ${targetPath}`));
    process.exit(1);
  }

  const script: VideoScript = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  console.log(chalk.green(`Loaded script with ${script.segments.length} segments.`));

  const options: VideoGenerateOptions = {
    type: 'product-hunt', // default
    output: 'reporeel-output.mp4',
    aiVideo: true,
    resolution: '720p',
    dryRun: false
  };

  // Create output directory
  const assetsDir = path.join(process.cwd(), 'reporeel-assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Audio Generation Phase (Fish Audio)
  const audioSpinner = ora('Generating voiceovers (Fish Audio)...').start();
  let audioPaths: string[] = [];
  try {
    audioPaths = await generateAudio(script, assetsDir);
    audioSpinner.succeed('Voiceovers generated successfully');
  } catch (e: any) {
    audioSpinner.fail('Voiceover generation failed');
    console.error(chalk.red(e.message));
    process.exit(1);
  }

  // Footage Generation Phase
  const footageSpinner = ora('Generating video footage via API...').start();
  let footage;
  try {
    footage = await generateFootage(script, options);
    footageSpinner.succeed('Footage generated successfully');
  } catch (e: any) {
    footageSpinner.fail('Footage generation failed');
    console.error(chalk.red(e.message));
    process.exit(1);
  }

  // FFmpeg Compilation Phase
  const finalOutput = path.join(assetsDir, 'agent-rendered-video.mp4');
  const editSpinner = ora('Compiling final video...').start();
  await compileVideo(footage, audioPaths, script, finalOutput);
  editSpinner.succeed(`Video successfully saved to ${chalk.green(`reporeel-assets/agent-rendered-video.mp4`)}`);
}
