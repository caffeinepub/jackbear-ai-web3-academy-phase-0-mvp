#!/usr/bin/env node

/**
 * Emoji Detection Script
 * Scans frontend source files for emoji unicode characters
 * Exits with non-zero status if emojis are found
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directories to scan
const SCAN_DIRS = [
  join(__dirname, '../src'),
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

// Emoji detection regex using Unicode property escapes
const EMOJI_REGEX = /\p{Extended_Pictographic}/gu;

// Files to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.test\./,
  /\.spec\./,
  /check-no-emoji\.mjs$/,
];

function shouldScanFile(filePath) {
  if (EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath))) {
    return false;
  }
  return EXTENSIONS.some(ext => filePath.endsWith(ext));
}

function scanDirectory(dirPath, findings = []) {
  const entries = readdirSync(dirPath);
  
  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, findings);
    } else if (stat.isFile() && shouldScanFile(fullPath)) {
      const content = readFileSync(fullPath, 'utf-8');
      const matches = content.match(EMOJI_REGEX);
      
      if (matches && matches.length > 0) {
        const lines = content.split('\n');
        const emojiLocations = [];
        
        lines.forEach((line, index) => {
          const lineMatches = line.match(EMOJI_REGEX);
          if (lineMatches) {
            emojiLocations.push({
              line: index + 1,
              emojis: lineMatches,
              context: line.trim().substring(0, 80),
            });
          }
        });
        
        findings.push({
          file: relative(process.cwd(), fullPath),
          locations: emojiLocations,
        });
      }
    }
  }
  
  return findings;
}

function main() {
  console.log('[CHECK] Scanning for emoji characters...\n');
  
  const allFindings = [];
  
  for (const dir of SCAN_DIRS) {
    const findings = scanDirectory(dir);
    allFindings.push(...findings);
  }
  
  if (allFindings.length === 0) {
    console.log('[SUCCESS] No emoji characters found. All clear!\n');
    process.exit(0);
  }
  
  console.log(`[ERROR] Found emoji characters in ${allFindings.length} file(s):\n`);
  
  for (const finding of allFindings) {
    console.log(`[FILE] ${finding.file}`);
    for (const location of finding.locations) {
      console.log(`   Line ${location.line}: ${location.emojis.join(' ')}`);
      console.log(`   Context: ${location.context}`);
    }
    console.log('');
  }
  
  console.log('[ACTION] Please replace emoji characters with Font Awesome icons.');
  console.log('   Use the FontAwesomeIcon component from @/components/FontAwesomeIcon\n');
  
  process.exit(1);
}

main();
