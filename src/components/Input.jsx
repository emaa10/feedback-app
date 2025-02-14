// src/components/ui/Input.jsx
export const Input = ({ value, onChange, placeholder, className }) => (
  <input 
    value={value}
    onChange={onChange} 
    placeholder={placeholder}
    className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

