// src/components/ui/Textarea.jsx
export const Textarea = ({ value, onChange, placeholder, className }) => (
  <textarea 
    value={value}
    onChange={onChange} 
    placeholder={placeholder}
    className={`border p-2 rounded focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

