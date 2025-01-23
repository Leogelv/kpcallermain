interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({ children, onClick, className = '' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`gradient-button ${className}`}
    >
      {children}
    </button>
  );
} 