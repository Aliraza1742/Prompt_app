import { NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__brand">
          <div style={{ 
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))', 
            padding: '6px', 
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="var(--primary-inv)" strokeWidth={2.5} />
          </div>
          <span>Prompt Studio</span>
        </div>

        <div className="navbar__links">
          <NavLink to="/" className={({ isActive }) => `navlink ${isActive ? 'navlink--active' : ''}`}>Home</NavLink>
          <NavLink to="/studio" className={({ isActive }) => `navlink ${isActive ? 'navlink--active' : ''}`}>Studio</NavLink>
          <NavLink to="/library" className={({ isActive }) => `navlink ${isActive ? 'navlink--active' : ''}`}>Library</NavLink>
          <NavLink to="/settings" className={({ isActive }) => `navlink ${isActive ? 'navlink--active' : ''}`}>Settings</NavLink>
        </div>
      </div>
    </nav>
  )
}
