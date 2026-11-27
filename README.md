# Portfolio

Dan's personal portfolio site, live at **https://vinersar31.github.io/portfolio/**.

It's a static [Next.js](https://nextjs.org) site with a home page featuring an interactive terminal, a projects page, a CV page (with a PDF download), and an about page.

## Tech stack

- Next.js 16 (App Router, static export) and React 19
- TypeScript
- Tailwind CSS 4, with light/dark themes via `next-themes`
- Vitest and Testing Library for unit tests

## Getting started

Requires Node.js 20 and npm.

```bash
npm ci        # install dependencies
npm run dev   # start the dev server
```

Then open http://localhost:3000/portfolio (the site is served under the `/portfolio` base path).

## Scripts

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the local dev server                    |
| `npm run cv:pdf`| Generate `public/cv.pdf` from `src/data/cv.ts` |
| `npm run build` | Build the static site into `out/`             |
| `npm run lint`  | Run ESLint                                    |
| `npm test`      | Run the unit tests once with Vitest           |

## Project layout

```
src/
  app/          Pages: home, projects, cv, about
  components/   Navbar, footer, terminal, theme provider
  data/         Site content (about, CV, projects, terminal commands)
  hooks/        Shared React hooks
tests/          Unit tests, mirroring src/
scripts/        Build scripts (CV PDF generation)
public/         Static assets and images
```

Most content changes only need an edit in `src/data/`. `public/cv.pdf` is generated from `src/data/cv.ts` before every `dev` and `build`, so it isn't committed.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `out/` to the `gh-pages` branch for GitHub Pages. Pull requests run the build without deploying, and `.github/workflows/test.yml` runs the unit tests.

## License

[MIT](LICENSE)
