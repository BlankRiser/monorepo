# Contributing

This is a personal project and contributions are accepted. Please open an issue or a pull request if you find a bug or have a feature request.

If any one wants to fork this repo and use it as a template, please do! I would love to see what you build with it. Just make sure to give me credit for the original template. :)

## Prerequisites

- Node.js v22 or later
- pnpm v8 or later

## Adding shadcn components from the ui package

To add components to your app, run the following command at the root of your `portfolio` app:

```bash
pnpm dlx shadcn@latest add button -c apps/portfolio
```

This will place the ui components in the `packages/ui/src/components` directory.

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button"
```
