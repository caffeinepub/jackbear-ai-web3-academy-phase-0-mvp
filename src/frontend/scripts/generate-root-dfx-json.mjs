#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the repository root (one level up from frontend/)
const rootPath = resolve(__dirname, '../../dfx.json');

const dfxConfig = {
  canisters: {
    backend: {
      type: 'motoko',
      main: 'backend/main.mo',
      declarations: {
        output: 'frontend/src/backend',
        bindings: ['ts'],
        node_compatibility: true,
      },
    },
    frontend: {
      type: 'assets',
      source: ['frontend/dist'],
      build: ['cd frontend && npm run build:skip-bindings'],
      dependencies: ['backend'],
    },
  },
  defaults: {
    build: {
      packtool: '',
    },
  },
  version: 1,
};

try {
  writeFileSync(rootPath, JSON.stringify(dfxConfig, null, 2), 'utf-8');
  console.log('✅ Generated dfx.json at repository root');
  console.log(`   Location: ${rootPath}`);
} catch (error) {
  console.error('❌ Failed to generate dfx.json:', error.message);
  process.exit(1);
}
