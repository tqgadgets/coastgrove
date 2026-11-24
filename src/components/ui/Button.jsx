import { Link } from 'react-router-dom';
import './Button.css';

export default function Button({
  variant = 'primary',
  type = 'button',
  to,
  className = '',
  children,
  ...props
}) {
  const classes = `cg-btn cg-btn--${variant}${className ? ` ${className}` : ''}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
