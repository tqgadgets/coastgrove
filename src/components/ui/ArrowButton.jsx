import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './ArrowButton.css';

export default function ArrowButton({
  type = 'button',
  to,
  ariaLabel = 'Open',
  className = '',
  ...props
}) {
  const classes = `cg-arrow-btn${className ? ` ${className}` : ''}`;

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel} {...props}>
        <ArrowUpRight size={20} strokeWidth={2} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} {...props}>
      <ArrowUpRight size={20} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
