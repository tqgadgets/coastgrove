import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, Phone, Sprout, X } from 'lucide-react';
import { business, navLinks } from '../data/site.js';
import Button from './ui/Button.jsx';
import './Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  function handleLogoClick(event) {
    if (location.pathname === '/') {
      event.preventDefault();
      if (location.hash) {
        navigate('/', { replace: true });
      }
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-logo" onClick={handleLogoClick}>
          <span className="site-logo__mark" aria-hidden="true">
            <Sprout size={20} strokeWidth={2.2} />
          </span>
          <span className="site-logo__name">{business.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `site-nav__link${isActive ? ' site-nav__link--active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <a
            href={business.phoneHref}
            className="call-now"
            aria-label={`Call Now at ${business.phone}`}
          >
            <span className="call-now__icon" aria-hidden="true">
              <Phone size={18} strokeWidth={2} />
            </span>
            <span className="call-now__number">{business.phone}</span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav-panel" className="mobile-menu">
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `mobile-menu__link${isActive ? ' mobile-menu__link--active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu__cta">
            <Button variant="primary" to="/contact">
              Get a Free Quote
              <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
