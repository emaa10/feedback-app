// src/components/ui/Card.jsx
export const Card = ({ children, className, onClick }) => (
  <div onClick={onClick} className={`border p-4 rounded shadow ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => <div>{children}</div>;

