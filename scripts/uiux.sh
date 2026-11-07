#!/usr/bin/env bash
# ==============================================================================
# Karvion Labs - UI/UX Pro Max CLI Helper
# Powered by UI/UX Pro Max Intelligence Engine (79 styles, 192 palettes, 119 UX rules)
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SEARCH_PY="${PROJECT_ROOT}/.agent/skills/ui-ux-pro-max/scripts/search.py"

if [ ! -f "${SEARCH_PY}" ]; then
  # Fallback to .agents if located there
  SEARCH_PY="${PROJECT_ROOT}/.agents/skills/ui-ux-pro-max/scripts/search.py"
fi

if [ ! -f "${SEARCH_PY}" ]; then
  echo "❌ Error: UI/UX Pro Max search engine not found at ${SEARCH_PY}" >&2
  exit 1
fi

show_help() {
  cat <<'EOF'
🎨 UI/UX Pro Max CLI Helper — Karvion Labs Design Intelligence

Usage:
  ./scripts/uiux.sh <command> [arguments]

Commands:
  ds <query> [options]         Generate comprehensive Design System (ASCII/Markdown)
  persist <query> [options]    Generate & save Design System to design-system/
  style <query>                Search design styles (79 styles: bento, dark mode, brutalism...)
  color <query>                Search palettes & color reasoning (192 product palettes)
  type <query>                 Search typography & Google font pairings (74 pairings)
  ux <query>                   Search UX guidelines & WCAG accessibility rules (119 rules)
  chart <query>                Search data visualization & chart configurations (25 charts)
  icons <query>                Search icon recommendations & Phosphor/Lucide SVGs
  motion <query>               Search GSAP / CSS motion animation presets (17 presets)
  stack <name> <query>         Search stack guidelines (shadcn, nextjs, react, html-tailwind...)
  help                         Show this help message

Examples:
  ./scripts/uiux.sh style "dark minimalist bento"
  ./scripts/uiux.sh ux "keyboard focus visible"
  ./scripts/uiux.sh stack shadcn "theming"
  ./scripts/uiux.sh ds "ai automation platform"
  ./scripts/uiux.sh persist "ai automation platform" --page "billing"

Direct Pass-through:
  ./scripts/uiux.sh "bento grid" --domain style --json
EOF
}

if [ $# -eq 0 ]; then
  show_help
  exit 0
fi

CMD="$1"
shift || true

case "${CMD}" in
  ds)
    python3 "${SEARCH_PY}" "$@" --design-system -p "Karvion Labs"
    ;;
  persist)
    python3 "${SEARCH_PY}" "$@" --design-system --persist -p "Karvion Labs" --output-dir "${PROJECT_ROOT}"
    ;;
  style)
    python3 "${SEARCH_PY}" "$@" --domain style
    ;;
  color)
    python3 "${SEARCH_PY}" "$@" --domain color
    ;;
  type|typography)
    python3 "${SEARCH_PY}" "$@" --domain typography
    ;;
  ux)
    python3 "${SEARCH_PY}" "$@" --domain ux
    ;;
  chart)
    python3 "${SEARCH_PY}" "$@" --domain chart
    ;;
  icons)
    python3 "${SEARCH_PY}" "$@" --domain icons
    ;;
  motion)
    python3 "${SEARCH_PY}" "$@" --domain gsap
    ;;
  stack)
    if [ $# -lt 2 ]; then
      echo "Usage: ./scripts/uiux.sh stack <stack-name> <query>"
      echo "Available stacks: shadcn, nextjs, react, html-tailwind, threejs, vue, svelte, astro..."
      exit 1
    fi
    STACK_NAME="$1"
    shift
    python3 "${SEARCH_PY}" "$@" --stack "${STACK_NAME}"
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    # Raw pass-through to search.py
    python3 "${SEARCH_PY}" "${CMD}" "$@"
    ;;
esac
