# Murad Alaskarov — Personal Website

A modern, minimal portfolio website built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Markdown** for content rendering
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── components/        # Reusable UI components
├── content/           # Markdown content files
│   ├── projects/      # Project descriptions
│   └── writings/      # Blog posts
├── pages/             # Page components
├── public/assets/     # Static assets (images, icons)
├── utils/             # Utility functions
├── constants.tsx      # Site content and configuration
├── types.ts           # TypeScript type definitions
└── index.tsx          # App entry point
```

## Adding Content

### Projects

Add a new markdown file in `content/projects/`:

```markdown
---
id: "1"
title: "Project Name"
description: "Brief description"
imageUrl: "/assets/project-image.png"
tags: ["React", "TypeScript"]
link: "#"
---

Optional extended description...
```

### Writings

Add a new markdown file in `content/writings/`:

```markdown
---
id: "1"
title: "Article Title"
excerpt: "Brief summary"
date: "Feb 2, 2026"
readTime: "5 min read"
category: "Tech"
imageUrl: "/assets/article-image.png"
---

Article content in markdown...
```

## Deployment

Build the project and deploy the `dist` folder to any static hosting:

```bash
npm run build
```

Compatible with Vercel, Netlify, GitHub Pages, and other static hosts.

## License

MIT
