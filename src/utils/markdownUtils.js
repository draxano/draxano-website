/**
 * Calculate reading time for markdown content
 * @param {string} content - Markdown content
 * @returns {string} Formatted reading time (e.g., "5 min read")
 */
export function calculateReadingTime(content) {
  if (!content) return '0 min read';

  // Remove markdown syntax for accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace links with text
    .replace(/[#*_~`]/g, '') // Remove markdown symbols
    .trim();

  // Count words
  const words = plainText.split(/\s+/).filter(word => word.length > 0).length;

  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}

/**
 * Generate table of contents from markdown headings
 * @param {string} content - Markdown content
 * @returns {Array} Array of TOC items: [{ level, text, id }]
 */
export function generateTableOfContents(content) {
  if (!content) return [];

  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // Number of # symbols
    const text = match[2].trim();
    const id = createSlug(text);

    toc.push({
      level,
      text,
      id
    });
  }

  return toc;
}

/**
 * Create URL-friendly slug from text
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Process markdown content to add IDs to headings for anchor links
 * @param {string} content - Markdown content
 * @returns {string} Modified content with heading IDs
 */
export function addHeadingIds(content) {
  if (!content) return '';

  return content.replace(/^(#{1,3})\s+(.+)$/gm, (match, hashes, text) => {
    const id = createSlug(text);
    // Add HTML anchor with ID before the heading
    return `<a id="${id}"></a>\n${match}`;
  });
}
