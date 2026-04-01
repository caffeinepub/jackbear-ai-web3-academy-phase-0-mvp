#!/usr/bin/env node

/**
 * Canonical Logo Path Checker
 * 
 * This script scans the frontend codebase for references to non-canonical
 * JackBear logo filenames/paths and fails if any are found.
 * 
 * CANONICAL PATH: /assets/generated/jbailogo.png
 * 
 * NON-CANONICAL PATHS (will cause failure):
 * - jackbearlogo.png (old canonical path)
 * - jackbearlogo.PNG (uppercase extension)
 * - jackbearlogo-*.png (numbered variants)
 * - jackbear-logo.* (alternate naming)
 * - jbailogo.PNG (uppercase extension)
 * - Any /assets/jbailogo.* paths (must be in /assets/generated/)
 * - Hard-coded logo paths not using JACKBEAR_LOGO_SRC from assets.ts
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths to scan
const FRONTEND_ROOT = join(__dirname, '..');
const SCAN_PATHS = [
  join(FRONTEND_ROOT, 'src'),
  join(FRONTEND_ROOT, 'index.html'),
];

// Canonical logo path (jbailogo.png)
const CANONICAL_LOGO_PATH = '/assets/generated/jbailogo.png';
const CANONICAL_PUBLIC_PATH = join(FRONTEND_ROOT, 'public', 'assets', 'generated', 'jbailogo.png');
const CANONICAL_CONSTANT_FILE = join(FRONTEND_ROOT, 'src', 'lib', 'assets.ts');

// Non-canonical patterns to detect
const NON_CANONICAL_PATTERNS = [
  /jackbearlogo\.png/gi,  // Old canonical path
  /jackbearlogo\.PNG/g,  // Uppercase extension
  /jackbearlogo-\d+\.png/gi,  // Numbered variants (e.g., jackbearlogo-1.png)
  /jackbearlogo-\d+\.PNG/g,  // Numbered variants with uppercase
  /jackbear-logo\./gi,  // Alternate naming (jackbear-logo.*)
  /jbailogo\.PNG/g,  // Uppercase extension for new logo
  /\/assets\/jbailogo\./g,  // Direct /assets/ path (not /assets/generated/)
];

// Files to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /\.test\./,
  /\.spec\./,
];

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (statSync(dirPath).isFile()) {
    return [dirPath];
  }

  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = join(dirPath, file);
    
    // Skip excluded paths
    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(fullPath))) {
      return;
    }

    if (statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (
      fullPath.endsWith('.ts') ||
      fullPath.endsWith('.tsx') ||
      fullPath.endsWith('.js') ||
      fullPath.endsWith('.jsx') ||
      fullPath.endsWith('.html')
    ) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Check a file for non-canonical logo references
 */
function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const findings = [];

  NON_CANONICAL_PATTERNS.forEach((pattern) => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const lines = content.substring(0, match.index).split('\n');
      const lineNumber = lines.length;
      const columnNumber = lines[lines.length - 1].length + 1;
      
      findings.push({
        file: relative(FRONTEND_ROOT, filePath),
        line: lineNumber,
        column: columnNumber,
        match: match[0],
        pattern: pattern.source,
      });
    }
  });

  return findings;
}

/**
 * Validate that the canonical public asset file exists
 */
function validateCanonicalAssetExists() {
  if (!existsSync(CANONICAL_PUBLIC_PATH)) {
    console.error('[ERROR] Canonical logo file does not exist at expected path:\n');
    console.error(`  Expected: ${relative(FRONTEND_ROOT, CANONICAL_PUBLIC_PATH)}\n`);
    console.error('[ACTION] ACTION REQUIRED:');
    console.error('  1. Ensure jbailogo.png exists in frontend/public/assets/generated/');
    console.error('  2. This file must be present for the logo to render correctly at runtime.\n');
    return false;
  }
  return true;
}

/**
 * Validate that the canonical constant in assets.ts is correct
 */
function validateCanonicalConstant() {
  if (!existsSync(CANONICAL_CONSTANT_FILE)) {
    console.error('[ERROR] Canonical constant file does not exist:\n');
    console.error(`  Expected: ${relative(FRONTEND_ROOT, CANONICAL_CONSTANT_FILE)}\n`);
    return false;
  }

  const content = readFileSync(CANONICAL_CONSTANT_FILE, 'utf-8');
  const expectedConstant = `JACKBEAR_LOGO_SRC = '${CANONICAL_LOGO_PATH}'`;
  
  if (!content.includes(expectedConstant)) {
    console.error('[ERROR] Canonical constant in assets.ts does not match expected value:\n');
    console.error(`  Expected: export const ${expectedConstant}\n`);
    console.error(`  File: ${relative(FRONTEND_ROOT, CANONICAL_CONSTANT_FILE)}\n`);
    return false;
  }
  
  return true;
}

/**
 * Main execution
 */
function main() {
  console.log('[CHECK] Scanning for non-canonical JackBear logo references...\n');
  console.log(`[OK] Canonical path: ${CANONICAL_LOGO_PATH}\n`);

  let hasErrors = false;

  // Step 1: Validate canonical asset file exists
  console.log('[STEP 1] Validating canonical asset file exists...');
  if (!validateCanonicalAssetExists()) {
    hasErrors = true;
  } else {
    console.log('[OK] Canonical asset file exists at frontend/public/assets/generated/jbailogo.png\n');
  }

  // Step 2: Validate canonical constant in assets.ts
  console.log('[STEP 2] Validating canonical constant in assets.ts...');
  if (!validateCanonicalConstant()) {
    hasErrors = true;
  } else {
    console.log('[OK] Canonical constant is correct in frontend/src/lib/assets.ts\n');
  }

  // Step 3: Scan for non-canonical references
  console.log('[STEP 3] Scanning for non-canonical logo references in code...');
  const allFiles = [];
  SCAN_PATHS.forEach((path) => {
    allFiles.push(...getAllFiles(path));
  });

  console.log(`[SCAN] Scanning ${allFiles.length} files...\n`);

  const allFindings = [];
  allFiles.forEach((file) => {
    const findings = checkFile(file);
    if (findings.length > 0) {
      allFindings.push(...findings);
    }
  });

  if (allFindings.length > 0) {
    hasErrors = true;
    console.error('[ERROR] Found non-canonical logo references:\n');
    
    allFindings.forEach((finding) => {
      console.error(`  ${finding.file}:${finding.line}:${finding.column}`);
      console.error(`    Found: "${finding.match}"`);
      console.error(`    Pattern: ${finding.pattern}\n`);
    });

    console.error(`\n[ERROR] Total: ${allFindings.length} non-canonical reference(s) found.\n`);
    console.error('[ACTION] ACTION REQUIRED:');
    console.error('  1. Replace all non-canonical logo paths with JACKBEAR_LOGO_SRC from @/lib/assets');
    console.error('  2. Use the JackBearLogo component for rendering the logo in React components');
    console.error(`  3. Ensure all references point to: ${CANONICAL_LOGO_PATH}\n`);
  } else {
    console.log('[OK] No non-canonical logo references found in code.\n');
  }

  // Final result
  if (hasErrors) {
    console.error('[FAILED] Canonical logo check failed. See errors above.\n');
    process.exit(1);
  } else {
    console.log('[SUCCESS] All canonical logo checks passed!\n');
    console.log('[OK] Logo asset exists, constant is correct, and no non-canonical references found.\n');
    process.exit(0);
  }
}

main();
