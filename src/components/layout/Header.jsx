import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  WRITINGS: '/writings',
}

function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to={ROUTES.HOME} className="logo">
          <img
            src="/images/draxano_star.svg"
            alt="Draxano Star Logo"
            className="logo-image"
          />
        </Link>
        <ul className="nav-links">
          <li>
            <Link to={ROUTES.HOME} className={isActive(ROUTES.HOME)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT} className={isActive(ROUTES.ABOUT)}>
              About
            </Link>
          </li>
          <li>
            <Link to={ROUTES.PROJECTS} className={isActive(ROUTES.PROJECTS)}>
              Projects
            </Link>
          </li>
          <li>
            <Link to={ROUTES.WRITINGS} className={isActive(ROUTES.WRITINGS)}>
              Writings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header

