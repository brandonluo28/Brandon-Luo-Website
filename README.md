# Brandon Luo — Electrical and Computer Engineering Portfolio

An interactive electrical schematic portfolio. Six IC symbols open detailed pages for BETA Technologies, SpaceX, Yellow Jacket Space Program, personal projects, The Hive, and Brandon's background. The top-level sheet uses a straight Ethernet pair, four-line SPI bus, CAN high/low bus with one termination resistor, American resistor symbols, parallel-plate decoupling capacitors, ground symbols, 3V3 rails, and no more than two no-connect markers per IC.

## Publish to GitHub

The intended repository is **brandonluo28/brandonluo28.github.io**, giving the site the address **https://brandonluo28.github.io/** once GitHub Pages deployment succeeds.

1. Create that public repository in the `brandonluo28` account.
2. Push the contents of this project to its `main` branch.
3. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
4. Open **Actions → Deploy portfolio to GitHub Pages** and run the workflow (or push another commit). GitHub shows the live URL when deployment completes.

The workflow follows [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). It publishes only `dist/client`, never application source or local files. This configuration targets a user site at the domain root.

## Work locally

Use Node.js 22 or later and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm start
```

`pnpm start` serves the production export at http://localhost:4173. The development server normally uses http://localhost:3000.

## Edit the portfolio

- `components/pcb-explorer.tsx`: interactive top-level schematic, American component symbols, and routed buses.
- `lib/portfolio.ts`: résumé content, researched context, project coordinates, and source links.
- `app/work/[slug]/page.tsx`: detailed project and About pages.
- `app/globals.css`: schematic sheet styling, responsive layout, colors, and signal nets.
- `app/layout.tsx`: browser title, description, and favicon metadata.
- `public/assets/`: optimized photos, converted faithfully from the supplied HEIC/JPG originals.
- `public/Brandon-Luo-Resume.pdf`: downloadable original résumé.
- `.github/workflows/deploy.yml`: automatic GitHub Pages deployment.

Content is based on the supplied résumé, the user's descriptions, and linked first-party sources. Supplied photos are converted and optimized for the web. No analytics, tracking, database, or external form service is included.

The build wrapper avoids immediate successful process termination on Windows so native build workers can close cleanly. Failed builds retain their failure exit codes. Dependency install scripts remain disabled in `pnpm-workspace.yaml`.
