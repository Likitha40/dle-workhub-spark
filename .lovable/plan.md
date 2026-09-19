# DLE Work Hub frontend prototype

## What I’ll build
- Replace the placeholder home page with the complete DLE Work Hub dashboard.
- Prioritize today’s tasks, followed by earnings, progress, impact, learning, and achievements.
- Add a desktop sidebar and a mobile bottom navigation bar using the five requested destinations as in-page dashboard views.
- Use the supplied mock data throughout.

## Interactions
- Task checkboxes and Start buttons will update completion and active states.
- View Earnings will open a clear earnings breakdown dialog.
- Start Training will open a training-start dialog with a simple lesson preview.
- Achievement badges will reveal progress when selected.
- Navigation items will scroll to and highlight their related dashboard section.

## Visual direction
- Warm, sustainability-inspired green palette with soft natural surfaces and encouraging accents.
- Large readable type, restrained icons, rounded cards, generous spacing, and no complex charts.
- Single-column mobile flow; balanced multi-column desktop layout with Today’s Tasks kept most prominent.

## Technical details
- Keep everything frontend-only with React state and mock data; no backend or persistence.
- Define semantic color, shadow, type, and animation tokens in the global design system.
- Add route-specific page metadata and accessible labels, focus states, dialogs, and controls.
- Validate the finished page at desktop and mobile widths and test each requested interaction.
