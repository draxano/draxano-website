import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">Murad Alaskar Draxano</h1>
        <p className="hero-subtitle">
          writing and software engineering
        </p>
        <div className="hero-cta">
          <Link to="/about" className="btn btn-primary">
            Learn More
          </Link>
          <Link to="/projects" className="btn btn-secondary">
            View Projects
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Hero

