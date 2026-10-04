import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Config } from '../shared/types';

const CONFIG_DIR = path.join(os.homedir(), '.reproreel');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');
const USAGE_PATH = path.join(CONFIG_DIR, 'usage.json');

export function loadConfig(): Config {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    return {};
  }
}

export function saveConfig(config: Config): void {
  fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), { mode: 0o600 });
}

export function getApiKey(key: keyof Config): string | undefined {
  // Prefer env vars over stored config
  const envMap: Record<string, string> = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    RUNWAY_API_KEY: process.env.RUNWAY_API_KEY || '',
    HF_API_KEY: process.env.HF_API_KEY || process.env.HUGGINGFACE_API_KEY || '',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '',
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || '',
  };
  const envVal = envMap[key as string];
  if (envVal) return envVal;
  return loadConfig()[key] as string | undefined;
}

export interface UsageRecord {
  date: string;
  project: string;
  format: string;
  videoSeconds: number;
  costUsd: number;
  provider: string;
}

export function trackUsage(record: UsageRecord): void {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  let usage: { sessions: UsageRecord[]; totalCostUsd: number } = { sessions: [], totalCostUsd: 0 };
  if (fs.existsSync(USAGE_PATH)) {
    try { usage = JSON.parse(fs.readFileSync(USAGE_PATH, 'utf8')); } catch { /* noop */ }
  }
  usage.sessions.push(record);
  usage.totalCostUsd = (usage.totalCostUsd || 0) + record.costUsd;
  fs.writeFileSync(USAGE_PATH, JSON.stringify(usage, null, 2));
}

export function getUsageSummary(): { sessions: UsageRecord[]; totalCostUsd: number } {
  if (!fs.existsSync(USAGE_PATH)) return { sessions: [], totalCostUsd: 0 };
  try {
    return JSON.parse(fs.readFileSync(USAGE_PATH, 'utf8'));
  } catch {
    return { sessions: [], totalCostUsd: 0 };
  }
}
