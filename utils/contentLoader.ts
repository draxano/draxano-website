import { Buffer } from 'buffer';
// Polyfill Buffer for browser environment (required by gray-matter)
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

import matter from 'gray-matter';
import { Post, Project } from '../types';

// Import all markdown files at build time
const writingFiles = import.meta.glob('../content/writings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

const projectFiles = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>;

function getSlugFromPath(path: string): string {
  const filename = path.split('/').pop() || '';
  return filename.replace('.md', '');
}

export function getWritings(): Post[] {
  const posts: Post[] = [];

  for (const [path, content] of Object.entries(writingFiles)) {
    const { data, content: rawContent } = matter(content);
    const slug = getSlugFromPath(path);

    posts.push({
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      readTime: data.readTime,
      category: data.category,
      imageUrl: data.imageUrl,
      slug,
      rawContent,
    });
  }

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getWritingBySlug(slug: string): Post | undefined {
  const writings = getWritings();
  return writings.find(post => post.slug === slug);
}

export function getProjects(): Project[] {
  const projects: Project[] = [];

  for (const [path, content] of Object.entries(projectFiles)) {
    const { data, content: rawContent } = matter(content);
    const slug = getSlugFromPath(path);

    projects.push({
      id: data.id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      tags: data.tags || [],
      link: data.link || '#',
      slug,
      rawContent,
    });
  }

  // Sort by id
  return projects.sort((a, b) => parseInt(a.id) - parseInt(b.id));
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find(project => project.slug === slug);
}
