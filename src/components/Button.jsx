// src/components/ui/Button.jsx
export const Button = ({ children, onClick, className }) => (
  <button 
    onClick={onClick} 
    className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none ${className}`}
  >
    {children}
  </button>
);

