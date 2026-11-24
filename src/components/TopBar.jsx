import { Mail, MapPin } from 'lucide-react';
import { business } from '../data/site.js';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span className="topbar__item">
          <MapPin size={16} strokeWidth={2} aria-hidden="true" />
          <span>{business.address}</span>
        </span>
        <a href={`mailto:${business.email}`} className="topbar__item">
          <Mail size={16} strokeWidth={2} aria-hidden="true" />
          <span>{business.email}</span>
        </a>
      </div>
    </div>
  );
}
