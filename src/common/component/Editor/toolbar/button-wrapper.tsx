import React, { FC, ReactNode, MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
}

const Index: FC<Props> = ({ children, onClick }) => {

  return (
    <button
      type="button"
      className="w-8 h-8 p-1 hover-gray rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Index;
