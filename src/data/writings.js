import { loadWritings } from '../utils/loadWritings'

/**
 * Writings Data - Loaded from markdown files
 * Files located in: src/content/writings/
 *
 * To add a new writing:
 * 1. Create a new .md file in src/content/writings/
 * 2. Name it: {id}-{slug}.md (e.g., 4-my-new-article.md)
 * 3. Add YAML frontmatter with: title, description, date, category, tags
 * 4. Write your content in markdown
 * 5. The writing will automatically appear!
 */
export const writings = loadWritings()
