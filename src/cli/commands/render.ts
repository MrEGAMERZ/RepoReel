import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { generateFootage } from '../../footage';
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

  // Footage Generation Phase
  const footageSpinner = ora('Generating video footage via API...').start();
  const footage = await generateFootage(script, options);
  footageSpinner.succeed('Footage generated successfully');

  // FFmpeg Compilation Phase
  const editSpinner = ora('Compiling final video...').start();
  await compileVideo(footage, script, options.output);
  editSpinner.succeed(`Video successfully saved to ${chalk.green(options.output)}`);
}
