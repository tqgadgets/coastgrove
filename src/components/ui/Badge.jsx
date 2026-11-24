import './Badge.css';

export default function Badge({ className = '', children, ...props }) {
  const classes = `cg-badge${className ? ` ${className}` : ''}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
