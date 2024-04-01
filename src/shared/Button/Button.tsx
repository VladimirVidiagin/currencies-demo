import { ReactNode, MouseEvent } from "react";

const Button: React.FC<{
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
