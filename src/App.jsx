import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Contact from './components/sections/Contact'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Writings from './pages/Writings'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/writings" element={<Writings />} />
          </Routes>
        </main>
        <Contact />
        <Footer />
      </div>
    </Router>
  )
}

export default App
