#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { videoCommand } from './commands/video';
import { configCommand } from './commands/config';

const pkg = require('../../package.json');

console.log(chalk.bold.hex('#6C63FF')('\n🎬 RepoReel') + chalk.gray(` v${pkg.version}\n`));

program
  .name('reproreel')
  .description('Turn any repo into a promotional video — in one command.')
  .version(pkg.version);

program
  .command('init')
  .description('Scan your repo and create a RepoReel context file')
  .option('--path <path>', 'Path to repo (default: current directory)', '.')
  .action(initCommand);

program
  .command('video')
  .description('Generate a promotional video from your repo')
  .option('--type <type>', 'Video format (product-hunt, explainer, twitter-demo, release-notes)', 'product-hunt')
  .option('--output <path>', 'Output file path', 'reproreel-output.mp4')
  .option('--no-ai-video', 'Skip AI video generation (use static images + Ken Burns)')
  .option('--resolution <res>', 'Video resolution (480p, 720p, 1080p)', '720p')
  .option('--dry-run', 'Show cost estimate only, do not generate')
  .action(videoCommand);

program
  .command('config')
  .description('Set API keys and preferences')
  .argument('<action>', 'set | get | list')
  .argument('[keyvalue]', 'KEY=value pair for set action')
  .action(configCommand);

program.parse(process.argv);
