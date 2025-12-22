import matter from 'gray-matter'
import { Buffer } from 'buffer'

// Make Buffer available globally for gray-matter
globalThis.Buffer = Buffer

/**
 * Load all writings from markdown files using Vite's import.meta.glob
 * Returns array of writing objects with parsed frontmatter and content
 */
export function loadWritings() {
  // Import all .md files from content/writings directory
  // Using as: 'raw' to get file contents as strings (Vite's glob import)
  const markdownFiles = import.meta.glob('../content/writings/*.md', {
    eager: true,
    as: 'raw'
  })

  const writings = []

  for (const path in markdownFiles) {
    const rawContent = markdownFiles[path]

    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(rawContent)

    // Extract ID from filename (e.g., "1-getting-started.md" -> 1)
    const filename = path.split('/').pop()
    const id = parseInt(filename.split('-')[0])

    writings.push({
      id,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      content: content.trim()
    })
  }

  // Sort by ID to maintain order
  return writings.sort((a, b) => a.id - b.id)
}
