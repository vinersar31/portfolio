This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CV-as-Code

This repository uses a data-driven pipeline for generating a professional CV PDF. Your CV data lives in a single JSON file, and the build script generates everything — including a Mermaid.js timeline diagram — automatically.

### Project Structure
| File | Purpose |
|------|---------|
| `cv.json` | Structured CV data (personal info, skills, experience, education) |
| `cv-template.html` | HTML template with `{{placeholder}}` tokens |
| `style.css` | Print-optimized CSS (A4 format, professional typography) |
| `scripts/build-cv.js` | Build script: reads JSON → populates template → auto-generates Mermaid gitGraph → renders PDF via Puppeteer |

### Editing the CV
- Modify `cv.json` to update your CV content. The Mermaid career timeline is auto-generated from your dates.
- Modify `cv-template.html` to change the document structure.
- Modify `style.css` to adjust the visual formatting.

### Local Development
To render the CV locally and preview `cv.pdf`:
1. Ensure dependencies are installed: `npm install`
2. Run the build script: `npm run build:cv`
3. Open the generated `cv.pdf` to preview.

### Automated Deployment
A GitHub Actions workflow automatically generates and commits `cv.pdf` whenever changes are pushed to `cv.json`, `cv-template.html`, or `style.css` on the `main` branch.
