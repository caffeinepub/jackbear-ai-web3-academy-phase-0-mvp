#!/usr/bin/env node

/**
 * DFX Deploy Wrapper
 * 
 * This script automates the deployment process by:
 * 1. Running pre-deployment checks (emoji check, canonical logo check)
 * 2. Generating the root dfx.json configuration
 * 3. Executing dfx deploy
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCRIPTS_DIR = __dirname;

/**
 * Execute a command and handle errors
 */
function runCommand(command, description) {
  console.log(`\n[*] ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', cwd: join(__dirname, '..') });
    console.log(`[SUCCESS] ${description} completed successfully`);
    return true;
  } catch (error) {
    console.error(`[ERROR] ${description} failed`);
    console.error(`[ERROR] Command: ${command}`);
    console.error(`[ERROR] Exit code: ${error.status || 'unknown'}`);
    return false;
  }
}

/**
 * Main deployment workflow
 */
function main() {
  console.log('[DEPLOY] Starting JackBear.ai deployment workflow...\n');

  // Step 1: Run emoji check
  const emojiCheckPath = join(SCRIPTS_DIR, 'check-no-emoji.mjs');
  if (!runCommand(`node ${emojiCheckPath}`, 'Running emoji check')) {
    console.error('\n[ABORT] Deployment aborted: Emoji check failed');
    console.error('[ACTION] Please remove all emoji characters from source files');
    console.error('[ACTION] Use Font Awesome icons from @/components/FontAwesomeIcon instead');
    process.exit(1);
  }

  // Step 2: Run canonical logo check
  const logoCheckPath = join(SCRIPTS_DIR, 'check-canonical-logo.mjs');
  if (!runCommand(`node ${logoCheckPath}`, 'Running canonical logo check')) {
    console.error('\n[ABORT] Deployment aborted: Canonical logo check failed');
    console.error('[ACTION] Please use JACKBEAR_LOGO_SRC from @/lib/assets');
    console.error('[ACTION] Or use the JackBearLogo component for React components');
    process.exit(1);
  }

  // Step 3: Generate dfx.json
  const generateDfxPath = join(SCRIPTS_DIR, 'generate-root-dfx-json.mjs');
  if (!runCommand(`node ${generateDfxPath}`, 'Generating dfx.json')) {
    console.error('\n[ABORT] Deployment aborted: dfx.json generation failed');
    process.exit(1);
  }

  // Step 4: Run dfx deploy
  if (!runCommand('dfx deploy', 'Deploying to Internet Computer')) {
    console.error('\n[ABORT] Deployment failed');
    console.error('[ACTION] Check dfx logs for details');
    process.exit(1);
  }

  console.log('\n[SUCCESS] Deployment completed successfully!\n');
}

main();
