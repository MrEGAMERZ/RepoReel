import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { glob } from 'glob';
import { RepoContext } from '../shared/types';

interface PackageInfo {
  name?: string;
  description?: string;
  installCommand?: string;
  websiteUrl?: string;
  license?: string;
  techStack: string[];
}

function detectTechStack(repoPath: string): string[] {
  const stack: string[] = [];
  const files = fs.readdirSync(repoPath);

  const detectors: [string | string[], string][] = [
    ['package.json', 'Node.js'],
    ['tsconfig.json', 'TypeScript'],
    ['requirements.txt', 'Python'],
    ['pyproject.toml', 'Python'],
    ['Cargo.toml', 'Rust'],
    ['go.mod', 'Go'],
    [['pom.xml', 'build.gradle'], 'Java'],
    ['composer.json', 'PHP'],
    ['Gemfile', 'Ruby'],
    ['next.config.js', 'Next.js'],
    ['vite.config.ts', 'Vite'],
    ['Dockerfile', 'Docker'],
    ['.github/workflows', 'GitHub Actions'],
  ];

  for (const [fileOrFiles, tech] of detectors) {
    const targets = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
    if (targets.some(f => files.includes(f) || fs.existsSync(path.join(repoPath, f)))) {
      stack.push(tech);
    }
  }
  return stack;
}

function parsePackageFiles(repoPath: string): PackageInfo {
  const info: PackageInfo = { techStack: [] };

  // Node / npm
  const pkgPath = path.join(repoPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      info.name = info.name || pkg.name;
      info.description = info.description || pkg.description;
      info.license = info.license || pkg.license;
      if (pkg.homepage) info.websiteUrl = pkg.homepage;
      const mgr = fs.existsSync(path.join(repoPath, 'yarn.lock')) ? 'yarn' : 'npm';
      info.installCommand = `${mgr} install`;
    } catch { /* noop */ }
  }

  // Python
  const requirementsPath = path.join(repoPath, 'requirements.txt');
  if (fs.existsSync(requirementsPath)) {
    info.installCommand = info.installCommand || 'pip install -r requirements.txt';
  }

  return info;
}

function parseReadme(repoPath: string): { description: string; features: string[] } {
  const readmePaths = ['README.md', 'README.MD', 'readme.md', 'Readme.md'];
  let content = '';

  for (const name of readmePaths) {
    const p = path.join(repoPath, name);
    if (fs.existsSync(p)) { content = fs.readFileSync(p, 'utf8'); break; }
  }

  if (!content) return { description: '', features: [] };

  // Extract description: first non-heading paragraph
  const descMatch = content.replace(/^#.*\n/m, '').match(/([A-Z][^.!?\n]{20,}[.!?])/);
  const description = descMatch?.[1]?.trim() || '';

  // Extract bullet-pointed features
  const featureMatches = content.matchAll(/^[-*+]\s+(.+)$/gm);
  const features = [...featureMatches]
    .map(m => m[1].trim())
    .filter(f => f.length > 10 && f.length < 120)
    .slice(0, 8);

  return { description, features };
}

function getGitInfo(repoPath: string): { commits: string[]; contributors: string[]; lastUpdated: string } {
  try {
    const log = execSync('git log --oneline -20', { cwd: repoPath, stdio: ['pipe', 'pipe', 'ignore'] })
      .toString().trim().split('\n').filter(Boolean);
    const contributors = execSync('git log --format="%an" | sort -u | head -10', {
      cwd: repoPath, shell: '/bin/bash', stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim().split('\n').filter(Boolean);
    const lastUpdated = execSync('git log -1 --format="%ci"', {
      cwd: repoPath, stdio: ['pipe', 'pipe', 'ignore']
    }).toString().trim();
    return { commits: log.slice(0, 10), contributors, lastUpdated };
  } catch {
    return { commits: [], contributors: [], lastUpdated: '' };
  }
}

export async function analyzeRepo(repoPath: string): Promise<RepoContext> {
  const absPath = path.resolve(repoPath);
  const folderName = path.basename(absPath);

  const pkgInfo = parsePackageFiles(absPath);
  const readmeInfo = parseReadme(absPath);
  const gitInfo = getGitInfo(absPath);
  const techStack = detectTechStack(absPath);

  // Detect main language from file counts
  const extensions: Record<string, number> = {};
  try {
    const files = await glob('**/*.{ts,tsx,js,jsx,py,rs,go,java,rb,php,swift,kt}', {
      cwd: absPath, ignore: ['node_modules/**', 'dist/**', '.git/**'], absolute: false
    });
    for (const f of files) {
      const ext = path.extname(f).toLowerCase();
      extensions[ext] = (extensions[ext] || 0) + 1;
    }
  } catch { /* noop */ }

  const extToLang: Record<string, string> = {
    '.ts': 'TypeScript', '.tsx': 'TypeScript', '.js': 'JavaScript', '.jsx': 'JavaScript',
    '.py': 'Python', '.rs': 'Rust', '.go': 'Go', '.java': 'Java',
    '.rb': 'Ruby', '.php': 'PHP', '.swift': 'Swift', '.kt': 'Kotlin',
  };
  const mainExt = Object.entries(extensions).sort((a, b) => b[1] - a[1])[0]?.[0] || '.ts';
  const mainLanguage = extToLang[mainExt] || 'Unknown';

  return {
    path: absPath,
    name: pkgInfo.name || folderName,
    description: pkgInfo.description || readmeInfo.description,
    techStack: [...new Set([...techStack])],
    mainLanguage,
    features: readmeInfo.features,
    recentCommits: gitInfo.commits,
    contributors: gitInfo.contributors,
    websiteUrl: pkgInfo.websiteUrl,
    installCommand: pkgInfo.installCommand,
    license: pkgInfo.license,
    lastUpdated: gitInfo.lastUpdated,
  };
}
