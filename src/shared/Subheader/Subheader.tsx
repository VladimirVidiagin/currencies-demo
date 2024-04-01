import { ReactNode } from "react";

const Subheader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="subheader">
      <h2>{children}</h2>
    </header>
  );
};

export default Subheader;
