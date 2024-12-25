// src/components/Button.tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
    >
      {label}
    </button>
  );
};

export default Button;
