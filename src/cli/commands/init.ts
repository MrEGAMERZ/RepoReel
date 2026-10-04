import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { analyzeRepo } from '../../analyzer';

export async function initCommand(options: { path: string }) {
  const targetPath = path.resolve(process.cwd(), options.path);
  
  console.log(chalk.blue('\n🔍 Initializing RepoReel Context...'));
  
  if (!fs.existsSync(targetPath)) {
    console.error(chalk.red(`Error: Path ${targetPath} does not exist.`));
    process.exit(1);
  }

  const spinner = ora('Scanning repository...').start();

  try {
    const context = await analyzeRepo(targetPath);
    spinner.succeed('Repository scanned successfully');

    const outPath = path.join(targetPath, '.reproreel.json');
    fs.writeFileSync(outPath, JSON.stringify(context, null, 2));

    console.log('\n✅ Context saved to ' + chalk.green('.reproreel.json'));
    console.log(chalk.gray('This file helps RepoReel understand your project. Feel free to edit it manually.'));
    
    console.log('\n📊 Project Summary:');
    console.log(`  Name: ${chalk.white.bold(context.name)}`);
    console.log(`  Main Language: ${chalk.cyan(context.mainLanguage)}`);
    console.log(`  Tech Stack: ${context.techStack.join(', ') || 'N/A'}`);
    if (context.description) {
      console.log(`  Description: ${context.description.substring(0, 80)}${context.description.length > 80 ? '...' : ''}`);
    }

    console.log('\n🚀 Next step: Generate a video!');
    console.log(chalk.magenta('  npx reproreel video --type product-hunt\n'));

  } catch (error: any) {
    spinner.fail('Failed to analyze repository');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}
