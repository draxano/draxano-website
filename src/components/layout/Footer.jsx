import { socials } from '../../data/socials'
import { useTypewriter } from '../../hooks/useTypewriter'
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope 
} from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const copyrightText = `© ${new Date().getFullYear()} Developed by Draxano Lab.`
  const displayedText = useTypewriter(copyrightText, 120, 400, 7)

  const getIcon = (platform) => {
    switch (platform) {
      case 'github':
        return <FaGithub />
      case 'linkedin':
        return <FaLinkedin />
      case 'twitter':
        return <FaTwitter />
      case 'email':
        return <FaEnvelope />
      default:
        return null
    }
  }

  return (
    <footer className="socials">
      <div className="container">
        <div className="socials-content">
          <p className="socials-text">Connect with me</p>
          <div className="social-links">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
              >
                <span className="social-icon">{getIcon(social.platform)}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="typewriter-text">{displayedText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

