import chalk from 'chalk';
import { loadConfig, saveConfig, Config } from '../../credits/config';

export async function configCommand(action: string, keyvalue?: string) {
  const config = loadConfig();

  if (action === 'list') {
    console.log(chalk.bold('\n⚙️  RepoReel Configuration:\n'));
    
    const keys: (keyof Config)[] = [
      'OPENAI_API_KEY', 'RUNWAY_API_KEY', 'HF_API_KEY', 
      'GEMINI_API_KEY', 'ELEVENLABS_API_KEY', 'defaultVoice'
    ];
    
    let hasKeys = false;
    for (const key of keys) {
      if (config[key]) {
        hasKeys = true;
        // Mask the API keys for display
        const val = config[key]!.toString();
        const masked = val.length > 8 ? `${val.substring(0, 4)}...${val.substring(val.length - 4)}` : '***';
        console.log(`  ${chalk.cyan(key)} = ${masked}`);
      }
    }
    
    if (!hasKeys) {
      console.log(chalk.gray('  No configuration found.'));
    }
    
    console.log('\n' + chalk.gray('Stored in ~/.reproreel/config.json\n'));
    return;
  }

  if (action === 'set') {
    if (!keyvalue || !keyvalue.includes('=')) {
      console.error(chalk.red('Error: Format must be KEY=value'));
      process.exit(1);
    }
    const [key, ...rest] = keyvalue.split('=');
    const value = rest.join('=');
    
    (config as any)[key] = value;
    saveConfig(config);
    
    console.log(chalk.green(`✅ Set ${key}`));
    return;
  }

  if (action === 'get') {
    if (!keyvalue) {
      console.error(chalk.red('Error: Provide a key to get'));
      process.exit(1);
    }
    const val = (config as any)[keyvalue];
    if (val !== undefined) {
      console.log(val);
    } else {
      console.log(chalk.gray(`Key ${keyvalue} is not set.`));
    }
    return;
  }

  console.error(chalk.red(`Error: Unknown action '${action}'. Use set, get, or list.`));
}
