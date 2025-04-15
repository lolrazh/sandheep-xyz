# sandheep.xyz

My personal website built with React, Vite, and TailwindCSS. Feel free to use this as a template for your own site.

## Features

- Markdown-based blog posts with dynamic imports
- Commonplace book for sharing interesting links
- Clean, minimalist design with subtle animations
- Fully responsive layout

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Bun](https://bun.sh/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/lolrazh/sandheep-xyz.git
cd sandheep-xyz
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun dev
```

4. Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

## Project Structure

```
sandheep-xyz/
├── content/        # Markdown content for blog posts
├── public/         # Static files
└── src/
    ├── components/ # React components
    ├── pages/      # Page components
    ├── utils/      # Utility functions
    └── data/       # Data files
```

## Deployment

The site is deployed on Vercel. To deploy your own:

1. Fork this repository
2. Import your fork to Vercel
3. Deploy