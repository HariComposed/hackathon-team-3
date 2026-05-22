# Composed OS — Hackathon Team 3

A hi-fi prototype of **Composed OS**: an AI-native operating system for marketing consultants. Built in 24 hours for the Composed Digital internal hackathon.

## What is it?

Composed OS is a browser-based workspace that combines project management, AI-assisted content creation, a shared knowledge base, and design handoff into a single interface — purpose-built for the way a martech consultancy actually works.

## Core apps

### Compose
The primary workspace. Manages client projects end-to-end:
- **Projects rail** — pinned and recent client projects at a glance
- **Brief** — a Notion-style document with slash-command AI actions for drafting, refining, and structuring campaign briefs
- **Workspace** — split-pane chat + live brief editor; Claude is the co-pilot
- **Prototype / Handoff** — hub for handing off to Document, Claude Design, or Claude Code modes

### Knowledge
A Confluence-style knowledge base integrated directly into the workspace. Structured tree of client folders, platform docs, and internal best practices. Accessible from within Compose via the slash menu or the top nav.

## Key screens

| Screen | Description |
|---|---|
| Setup | New project onboarding — name, client, platform selection (Braze, SFMC, etc.) |
| Brief | Full-page brief editor with slash-command AI menu |
| Workspace | Chat + live brief side-by-side |
| Handoff Hub | Pick a handoff mode: Document, Claude Design, Claude Code |
| Knowledge | Tree nav + doc reader |
| Share | Invite collaborators, manage link sharing and scope |
| Upload | Attach context files to a project |

## File structure

```
hifi/               # Hi-fi React components (self-contained, no build step)
  App.jsx           # Root — state, routing, nav
  Shell.jsx         # Top nav, app switcher
  Projects.jsx      # Projects rail + project header + tabs
  Setup.jsx         # New project flow
  Brief.jsx         # Brief tab with slash menu
  Workspace.jsx     # Chat + live brief
  Handoff.jsx       # Prototype/handoff hub
  Knowledge.jsx     # Knowledge base app
  Share.jsx         # Share modal
  Upload.jsx        # Upload modal
  ui.jsx            # Shared primitives and design tokens
  colors_and_type.css
  assets/

app.jsx             # Earlier iteration
v2-*.jsx            # v2 direction explorations
design-canvas.jsx   # Design canvas / wireframe exploration
directions-*.jsx    # Direction 1–5 concept explorations
composed-tokens.css # Design tokens
*.html              # Standalone HTML bundles (open directly in browser)
```

## Running it

No build step required. Open any `.html` file directly in a browser:

- `Composed Compose - standalone.html` — full self-contained prototype
- `Composed Compose - hi-fi.html` — hi-fi version
- `Composed Claude wireframes.html` — wireframe explorations

Or serve locally:

```bash
npx serve .
```

## Tech

- React (via CDN, no bundler)
- Lucide icons
- Plain CSS with design tokens
- Self-contained HTML bundles for easy sharing

## Team

Composed Digital — Hackathon 2026, Team 3
