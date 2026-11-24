import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { business, navLinks, services } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              <span className="site-footer__logo-mark" aria-hidden="true">
                <Sprout size={20} strokeWidth={2.2} />
              </span>
              <span className="site-footer__logo-name">{business.name}</span>
            </Link>
            <p className="site-footer__tagline">{business.tagline}</p>
          </div>

          <div>
            <h2 className="site-footer__heading">Quick Links</h2>
            <ul className="site-footer__list">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="site-footer__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__heading">Services</h2>
            <ul className="site-footer__list">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="site-footer__link">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="site-footer__heading">Contact Us</h2>
            <ul className="site-footer__list">
              <li>
                <a href={business.phoneHref} className="site-footer__link">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="site-footer__link">
                  {business.email}
                </a>
              </li>
              <li className="site-footer__contact-item">{business.address}</li>
              <li className="site-footer__contact-item">{business.hours}</li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>{business.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
