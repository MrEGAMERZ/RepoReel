import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { analyzeRepo } from '../../analyzer';
import { generateScript } from '../../story';
import { VideoGenerateOptions, RepoContext } from '../../shared/types';
import { generateFootage } from '../../footage';
import { compileVideo } from '../../editor';

export async function videoCommand(options: VideoGenerateOptions) {
  console.log(chalk.blue.bold(`\n🎬 RepoReel - Generating ${options.type} video`));

  const targetPath = process.cwd();
  let context: RepoContext;
  
  const contextPath = path.join(targetPath, '.reproreel.json');
  if (fs.existsSync(contextPath)) {
    console.log(chalk.gray('Loading cached repository context...'));
    context = JSON.parse(fs.readFileSync(contextPath, 'utf8'));
  } else {
    const spinner = ora('Analyzing repository...').start();
    try {
      context = await analyzeRepo(targetPath);
      spinner.succeed('Repository analyzed');
    } catch (e: any) {
      spinner.fail('Analysis failed');
      console.error(chalk.red(e.message));
      process.exit(1);
    }
  }

  // Create output directory inside the project
  const assetsDir = path.join(targetPath, 'reporeel-assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Story & Script Phase
  let script;
  const scriptSpinner = ora('Writing script via AI (Gemini)...').start();
  try {
    script = await generateScript(context, options.type);
    
    // Save the script to the assets folder
    const scriptPath = path.join(assetsDir, `${options.type}-script.json`);
    fs.writeFileSync(scriptPath, JSON.stringify(script, null, 2));
    
    scriptSpinner.succeed(`Script generated and saved to reporeel-assets/${options.type}-script.json`);
  } catch (e: any) {
    scriptSpinner.fail('Script generation failed');
    console.error(chalk.red(e.message));
    process.exit(1);
  }

  if (options.dryRun) {
    console.log(chalk.yellow('\nDry run complete. No video was rendered. Check reporeel-assets/ for the script.'));
    return;
  }

  // Footage Generation Phase (Higgsfield)
  const footageSpinner = ora('Generating video footage (Higgsfield AI)...').start();
  const footage = await generateFootage(script, options);
  footageSpinner.succeed('Footage generated successfully');

  // FFmpeg Compilation Phase
  const finalOutput = path.join(assetsDir, `${options.type}-video.mp4`);
  const editSpinner = ora('Compiling final video with FFmpeg...').start();
  await compileVideo(footage, script, finalOutput);
  editSpinner.succeed(`Video successfully saved to ${chalk.green(`reporeel-assets/${options.type}-video.mp4`)}`);
}
