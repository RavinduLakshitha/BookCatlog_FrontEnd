import React from "react";
import type { ReactNode } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "secondary";
  disabled?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick = () => {},
  type = "button",
  variant = "primary",
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  const baseClasses =
    "px-4 py-3 rounded-[15px] font-bold transition-all duration-300 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2";

  const variantClasses = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-orange-500 text-white hover:bg-orange-600",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${fullWidth ? "w-l justify-center" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};
