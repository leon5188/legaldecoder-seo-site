<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DESIGN.md Visual Identity & Token Rules
- When editing or creating UI elements, check if a `DESIGN.md` file exists in the repository.
- Ground all color, typography, rounding, and spacing choices in the design tokens of `DESIGN.md`.
- Prior to finalizing design/styling work, use the `design-md` skill CLI command to validate your layout (`lint`) and make sure no contrast ratios are violated.
