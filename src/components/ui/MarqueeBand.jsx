import { Asterisk } from 'lucide-react';
import './MarqueeBand.css';

function MarqueeGroup({ items, isDuplicate = false }) {
  return (
    <div
      className={`marquee-band__group${
        isDuplicate ? ' marquee-band__group--duplicate' : ''
      }`}
    >
      {items.map((item, index) => (
        <span key={`${isDuplicate ? 'dup' : 'main'}-${item}-${index}`} className="marquee-band__item">
          <span>{item}</span>
          <span
            className={`marquee-band__asterisk ${
              index % 2 === 0
                ? 'marquee-band__asterisk--white'
                : 'marquee-band__asterisk--lime'
            }`}
          >
            <Asterisk size={20} strokeWidth={2.5} />
          </span>
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBand({ items = [] }) {
  return (
    <div className="marquee-band-wrap" aria-hidden="true">
      <div className="marquee-band">
        <div className="marquee-band__track">
          <MarqueeGroup items={items} />
          <MarqueeGroup items={items} isDuplicate />
        </div>
      </div>
    </div>
  );
}
