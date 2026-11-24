import './Card.css';

export default function Card({ className = '', children, ...props }) {
  const classes = `cg-card${className ? ` ${className}` : ''}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
