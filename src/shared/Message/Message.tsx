import { ReactNode } from "react";

const Message: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <p>{children}</p>
    </div>
  );
};

export default Message;
