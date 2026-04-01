# JackBear.ai — ICPedia Knowledge Hub + Research

## Current State
- `/icpedia` exists as `ICPEDIAPage.tsx` — basic encyclopedia with 3 mock topics, search, and category filter
- `/glossary` exists as a separate route
- No research section exists anywhere
- Header has ICPedia in a More dropdown

## Requested Changes (Diff)

### Add
- `src/frontend/src/lib/researchData.ts` — static research papers data (4 papers with slug, title, subtitle, description, tags, content sections, pdfPath)
- `src/frontend/src/pages/ICPediaResearchArticlePage.tsx` — article detail page for `/icpedia/research/$slug`
- Routes: `/icpedia/research` (redirects to /icpedia?tab=research) and `/icpedia/research/$slug`

### Modify
- `src/frontend/src/pages/ICPEDIAPage.tsx` — add hub header with segmented tabs (Encyclopedia | Research), Glossary entry point card, Research tab with research cards (title, description, tags, Read + Download PDF buttons)
- `src/frontend/src/App.tsx` — add `/icpedia/research` and `/icpedia/research/$slug` routes

### Remove
Nothing removed

## Implementation Plan
1. Create static research data file with 4 ICP-native research papers
2. Enhance ICPEDIAPage with tab switcher (Encyclopedia | Research) and Glossary entry card in the hub header area
3. Research tab: grid of research cards, each with title, short description, tags, Read button (→ article page), Download PDF button (→ public PDF asset path)
4. Create ICPediaResearchArticlePage with title, subtitle, content sections, Download PDF, Continue Learning → /intelligence
5. Register new routes in App.tsx
6. Place placeholder PDF files in public/assets/pdfs/ (or use # links clearly)
