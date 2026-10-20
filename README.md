# Fizzi

<!-- Replace this placeholder with a project banner image. -->
![Fizzi project banner](public/OG%20Image.png)

<div align="center">

<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=nextdotjs" alt="Next.js"></a> <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a> <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a> <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a> <a href="https://gsap.com/"><img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP"></a> <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js"></a> <a href="https://zustand-demo.pmnd.rs/"><img src="https://img.shields.io/badge/Zustand-5-brown?style=for-the-badge" alt="Zustand"></a>

</div>


**Fizzi** is a colorful, animated landing page for a fictional gut-friendly soda brand. It introduces five fruit flavors through scroll-led storytelling, motion design, and interactive 3D product scenes.

## What’s on the page

- **Hero:** “Live Gutsy” introduction, product highlights, and a can showcase.
- **Dive:** A scroll-pinned 3D scene with a floating can, clouds, and animated type.
- **Flavor story:** A product carousel followed by alternating product details.
- **Brand close:** Moving message belts, a rotating can, and a flavor-focused footer.

The layout and product sections adapt for mobile and desktop. Three.js assets load behind a progress overlay before scrolling is enabled.

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create and run a production build:

```bash
npm run build
npm start
```

`npm run lint` runs ESLint. `npm run format` formats the project with Prettier.

## Project map

```text
app/                  Next.js App Router layout, home page, and global styles
components/            Shared header, footer, SVGs, and reusable UI
components/sections/   Hero, dive, carousel, alternating story, and brand belt
components/three/      Shared Three.js canvas, cans, and bubbles
store/                 Small Zustand app state store
public/                Product images, 3D model, environment maps, fonts, and icons
```

The home page is assembled in `app/page.tsx`. `app/layout.tsx` provides the shared header and footer, metadata, font, and the fixed `<ViewCanvas />` that hosts the Drei views used across the page.

## Assets and content

The soda model and environment maps live in `public/models/` and `public/hdr/`; flavor label images, fonts, and brand images are also served from `public/`. The landing page content and flavor details are currently authored directly in the section components.

## Deployment

The project can be deployed to any platform that supports Next.js. The metadata currently points to `https://fizzy-gutsy.vercel.app`; update the canonical and social URLs in `app/layout.tsx` when deploying to a different domain.
