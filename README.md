# Midas UI/UX Pipeline

A comprehensive AI-powered UI/UX development pipeline for building modern financial platforms. This repository demonstrates the integration of Figma, shadcn/ui, ReactBits, and structured UX decision frameworks with Cursor IDE's Model Context Protocol (MCP).

## Overview

This pipeline enables rapid, intentional interface design by combining:
- **Design System Sync** — Real-time Figma integration via MCP
- **Component Libraries** — shadcn/ui + ReactBits animated components
- **UX Decision Framework** — Structured patterns and checklists
- **AI-Assisted Development** — Cursor IDE with custom rules

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/midas-uiux-pipeline.git
cd midas-uiux-pipeline/midas-web
npm install
npm run dev
```

### 2. Configure Cursor IDE

Copy the configuration folders to your project:

```bash
# Copy MCP configuration
cp -r .cursor /path/to/your/project/

# Copy UX skills
cp -r .agents /path/to/your/project/
```

### 3. Set Up MCP Servers

The pipeline uses three MCP servers configured in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "reactbits": {
      "command": "npx",
      "args": ["reactbits-dev-mcp-server"]
    }
  }
}
```

**Note:** Figma MCP (`user-Figma`) is configured separately in Cursor Settings → MCP.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CURSOR IDE + MCP                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Figma     │  │   shadcn    │  │  ReactBits  │             │
│  │    MCP      │  │    MCP      │  │    MCP      │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         ▼                ▼                ▼                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   AI Agent Context                       │   │
│  │  • Design specs from Figma                              │   │
│  │  • Component code from shadcn                           │   │
│  │  • Animation code from ReactBits                        │   │
│  │  • UX patterns from .agents/skills                      │   │
│  │  • Product requirements from PRDs                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │               Generated React/Next.js Code               │   │
│  │           (midas-web with full documentation)            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## MCP Server Setup

### Figma MCP (Design Source of Truth)

1. **Install Figma Desktop App** (required for MCP)
2. **Enable MCP in Figma:**
   - Figma → Preferences → Enable Developer Mode
   - Figma → Plugins → Enable MCP Server
3. **Configure in Cursor:**
   - Open Cursor Settings → MCP
   - Add Figma MCP server connection

**Available Tools:**
| Tool | Purpose |
|------|---------|
| `get_screenshot` | Capture visual of any Figma node |
| `get_design_context` | Generate React code from design |
| `get_metadata` | Component hierarchy and properties |
| `get_variable_defs` | Design tokens (colors, spacing, fonts) |

**Usage Example:**
```
"Get the design for node 746:1804 from file avcUZMq2uSw4uGTj7EtZ0Q"
```

### shadcn MCP (Base Components)

Pre-configured in `.cursor/mcp.json`. Starts automatically.

**Available Tools:**
| Tool | Purpose |
|------|---------|
| `list_items_in_registries` | Browse all components |
| `search_items_in_registries` | Find by keyword |
| `get_item_examples_from_registries` | Get usage examples |

**Key Components:** Button, Card, Dialog, Table, Form, Input, Select, Tabs, Avatar, Badge, Skeleton, Toast

### ReactBits MCP (Animations & Effects)

Pre-configured in `.cursor/mcp.json`. Provides 135+ animated components.

**Available Tools:**
| Tool | Purpose |
|------|---------|
| `list_components` | Browse all categories |
| `search_components` | Find by keyword |
| `get_component` | Get full component code |

**Categories:** animations, backgrounds, buttons, cards, text-animations, navigation

**Popular Components:**
- `CountUp` — Animated number counters
- `SpotlightCard` — Cards with hover spotlight effect
- `TextReveal` — Animated text reveal
- `Aurora` — Animated aurora background

---

## UX Decisions Framework

Located in `.agents/skills/ux-decisions/`, this framework provides structured decision-making for UI/UX design.

### Reference Files

#### Foundational
| File | Use For |
|------|---------|
| `00-core-framework.md` | 3 pillars, decisioning workflow |
| `01-anchors.md` | 7 design mindsets |
| `02-information-scaffold.md` | Psychology, economics, accessibility |

#### Checklists
| File | Use For |
|------|---------|
| `10-checklist-new-interfaces.md` | New screen design (6-step process) |
| `11-checklist-fidelity.md` | Component states, interactions |
| `12-checklist-visual-style.md` | Spacing, color, typography, motion |
| `13-checklist-innovation.md` | Originality spectrum |

#### Patterns
| File | Use For |
|------|---------|
| `20-patterns-chunking.md` | Cards, tabs, accordions |
| `21-patterns-progressive-disclosure.md` | Tooltips, modals, drawers |
| `22-patterns-cognitive-load.md` | Wizards, steppers |
| `23-patterns-visual-hierarchy.md` | Typography, whitespace, color |
| `25-patterns-feedback.md` | Progress, notifications |
| `26-patterns-error-handling.md` | Validation, undo/redo |
| `27-patterns-accessibility.md` | ARIA, keyboard nav |
| `31-patterns-navigation.md` | Priority nav, sticky, bottom |

---

## Workflow: WEIGH → NARROW → EXECUTE

### Step 1: WEIGH Information

Before implementing ANY UI:

```
1. Read relevant PRD in docs/PRD/
2. Check USER_STORIES.csv for acceptance criteria
3. Read UX pattern from .agents/skills/ux-decisions/references/
4. Query Figma MCP for official design
5. Query shadcn/reactbits for available components
```

### Step 2: NARROW Options

Ask these questions:

```
1. What does the PRD require?
2. What does the Figma design show?
3. What patterns fit from ux-decisions?
4. What components exist in MCP servers?
```

### Step 3: EXECUTE with Documentation

Every component should document its sources:

```tsx
/**
 * Portfolio Dashboard
 * 
 * UX DECISIONS:
 * - Figma: Node 746:1804 (Dashboard)
 * - PRD: portfolio-management.md (US-53)
 * - Pattern: 23-patterns-visual-hierarchy.md
 * - Components: shadcn Card, reactbits CountUp
 */
```

---

## Component Decision Tree

```
Need a component?
│
├─ Check Figma first → Get design reference
│
├─ Base UI (button, card, input, table)?
│  └─ Query shadcn MCP → Use shadcn component
│
├─ Animation or effect?
│  └─ Query reactbits MCP → Use reactbits component
│
├─ Both base + animation?
│  └─ Combine shadcn + reactbits
│
└─ Nothing exists?
   └─ Build custom + document why
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Base Components | shadcn/ui (via MCP) |
| Animations | ReactBits (via MCP) |
| Charts | Recharts |
| Icons | Lucide React |

---

## Project Structure

```
midas-uiux-pipeline/
├── .agents/
│   └── skills/
│       └── ux-decisions/           # UX decision framework
│           ├── SKILL.md            # Skill configuration
│           └── references/         # Pattern & checklist files
│
├── .cursor/
│   ├── mcp.json                    # MCP server configuration
│   └── rules/
│       └── midas-uiux-pipeline.mdc # AI behavior rules
│
├── midas-web/                      # Next.js frontend
│   ├── src/
│   │   ├── app/                    # App router pages
│   │   ├── components/             # UI components
│   │   │   ├── ui/                 # Base shadcn components
│   │   │   ├── layout/             # Layout components
│   │   │   └── dashboard/          # Feature components
│   │   └── lib/                    # Utilities & API
│   └── package.json
│
└── README.md                       # This file
```

---

## Design Tokens (Midas Brand)

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary Purple | `#2D1B4E` | Headers, sidebar, buttons |
| Gold Accent | `#C9A962` | Highlights, active states |
| Secondary Purple | `#6B5B7A` | Secondary text |
| Background | `#FAF8F5` | Main content area |
| Border | `#E8E4DF` | Cards, dividers |

### Typography

| Element | Font | Weight |
|---------|------|--------|
| Headings | Geist | 600 |
| Body | Inter | 400 |
| Numbers | Inter (tabular-nums) | 500 |

### Financial Data Patterns

```tsx
// Profit/loss visual distinction
<span className={cn(
  "tabular-nums",
  value >= 0 ? "text-emerald-600" : "text-red-600"
)}>
  {value >= 0 ? '+' : ''}{value.toFixed(2)}%
</span>

// Animated counters for KPIs
<CountUp 
  to={portfolioValue} 
  prefix="$" 
  decimals={2} 
  separator="," 
  duration={1}
/>
```

---

## Best Practices

### DO ✅

- Query Figma MCP **FIRST** for official design
- Read UX decisions reference before designing
- Read relevant PRD before implementing
- Query shadcn MCP for base components
- Query reactbits MCP for animations
- Document reasoning with Figma node reference
- Use `tabular-nums` for financial data

### DON'T ❌

- Implement UI without checking Figma first
- Build components without querying MCP
- Guess component props
- Create custom animation when reactbits has one
- Make visual choices without reading PRD
- Not document WHY a choice was made
- Use emojis as functional icons

---

## Example: Adding a New Dashboard Card

```tsx
/**
 * Portfolio Value Card
 * 
 * Figma: Node 746:1804 (Dashboard - Portfolio Section)
 * PRD: portfolio-management.md (US-53: View total portfolio value)
 * Pattern: 23-patterns-visual-hierarchy.md (Information hierarchy)
 * Components: 
 *   - shadcn: Card, CardHeader, CardContent
 *   - reactbits: CountUp
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CountUp } from '@/components/ui/count-up'
import { Wallet } from 'lucide-react'

export function PortfolioValueCard({ value }: { value: number }) {
  return (
    <Card className="bg-white border-[#E8E4DF] hover:border-[#C9A962] transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-[#6B5B7A]">
          <Wallet className="size-4" />
          Total Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tabular-nums text-[#2D1B4E]">
          <CountUp to={value} prefix="$" duration={1} separator="," decimals={2} />
        </p>
      </CardContent>
    </Card>
  )
}
```

---

## Contributing

1. Follow the WEIGH → NARROW → EXECUTE workflow
2. Always document Figma node references
3. Query MCP servers before building custom components
4. Include relevant UX pattern references in comments

---

## Credits

- **UX Decisions Framework** — [Tommy Geoco](https://uxdecisions.com)
- **shadcn/ui** — [shadcn](https://ui.shadcn.com)
- **ReactBits** — [ReactBits](https://reactbits.dev)
- **Cursor IDE** — [Cursor](https://cursor.com)

---

## License

MIT
