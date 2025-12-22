import { useState, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { writings } from '../../data/writings'
import { calculateReadingTime, generateTableOfContents } from '../../utils/markdownUtils'
import Card from '../ui/Card'
import './Writings.css'

function Writings() {
  const [selectedWriting, setSelectedWriting] = useState(null)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const openWriting = (writing) => {
    setSelectedWriting(writing)
  }

  const closeWriting = () => {
    setSelectedWriting(null)
  }

  // Generate table of contents and reading time when a writing is selected
  const toc = useMemo(() => {
    if (!selectedWriting) return []
    return generateTableOfContents(selectedWriting.content)
  }, [selectedWriting])

  const readingTime = useMemo(() => {
    if (!selectedWriting) return ''
    return calculateReadingTime(selectedWriting.content)
  }, [selectedWriting])

  // Handle TOC link clicks
  const handleTocClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="writings">
      <div className="container">
        <h1 className="page-title">Writings</h1>
        <p className="writings-intro">
          Explore my writings on web development, programming, and technology.
        </p>
        <div className="writings-list">
          {writings.map((writing) => (
            <Card key={writing.id} className="writing-card">
              <h3 className="writing-title">{writing.title}</h3>
              <p className="writing-description">{writing.description}</p>
              <div className="writing-meta">
                <div>
                  <span className="writing-date">{formatDate(writing.date)}</span>
                  <span className="reading-time">
                    📖 {calculateReadingTime(writing.content)}
                  </span>
                </div>
                <div className="writing-actions">
                  <button
                    onClick={() => openWriting(writing)}
                    className="btn btn-primary"
                  >
                    Read Article
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Writing Viewer Modal */}
      {selectedWriting && (
        <div className="writing-modal-overlay" onClick={closeWriting}>
          <div className="writing-modal" onClick={(e) => e.stopPropagation()}>
            {/* Sidebar with Table of Contents */}
            <div className="writing-modal-sidebar">
              <nav className="toc">
                <h3>Table of Contents</h3>
                {toc.length > 0 ? (
                  <ul>
                    {toc.map((item, index) => (
                      <li key={index} className={`toc-level-${item.level}`}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleTocClick(e, item.id)}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="toc-empty">No headings found</p>
                )}
              </nav>
            </div>

            {/* Main content */}
            <div className="writing-modal-main">
              <div className="writing-modal-header">
                <div className="writing-modal-info">
                  <h2>{selectedWriting.title}</h2>
                  <p className="writing-modal-meta">
                    {formatDate(selectedWriting.date)} · {readingTime}
                  </p>
                </div>
                <button className="writing-modal-close" onClick={closeWriting}>
                  ×
                </button>
              </div>

              <div className="writing-modal-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    // Add IDs to headings for anchor links
                    h1: ({ children, ...props }) => {
                      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                      return <h1 id={id} {...props}>{children}</h1>
                    },
                    h2: ({ children, ...props }) => {
                      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                      return <h2 id={id} {...props}>{children}</h2>
                    },
                    h3: ({ children, ...props }) => {
                      const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                      return <h3 id={id} {...props}>{children}</h3>
                    },
                  }}
                >
                  {selectedWriting.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Writings
