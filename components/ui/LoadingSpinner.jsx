"use client";

import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = "large",
  className = "",
  message = "Loading...",
}) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center h-40 ${className}`}
    >
      <Loader2
        className={`animate-spin ${sizeClasses[size]} text-primary mb-2`}
        aria-hidden="true"
      />
      <span className="text-gray-500">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
