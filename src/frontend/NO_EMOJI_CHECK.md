# Frontend Code Quality Checks

This document describes the automated checks that run before deployment to ensure code quality and consistency.

## Overview

The JackBear.ai frontend enforces several automated checks to maintain code quality:

1. **No Emoji Check** - Ensures no emoji characters are present in source code
2. **Canonical Logo Check** - Ensures only the canonical logo path is used throughout the codebase

These checks run automatically during deployment via the `dfx-deploy-wrapper.mjs` script.

---

## 1. No Emoji Check

### Why No Emojis?

Emoji characters in source code can cause:
- Encoding issues across different systems
- Inconsistent rendering in different environments
- Accessibility problems for screen readers
- Unpredictable behavior in some build tools

### What to Use Instead

Use **Font Awesome icons** via the `FontAwesomeIcon` component:

