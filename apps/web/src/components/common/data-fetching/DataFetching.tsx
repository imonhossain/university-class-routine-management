import React from 'react';

interface Props {
  text?: string;
  className?: string;
}

const DataFetching: React.FC<Props> = ({
  text = 'Loading ',
  className = 'h-20',
}) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className="flex items-center">
        <h2 className="font-body text-primary">{text}</h2>
        <div className="loading-dots">
          <div className="loading-dots--dot" />
          <div className="loading-dots--dot" />
          <div className="loading-dots--dot" />
          <div className="loading-dots--dot" />
        </div>
      </div>
    </div>
  );
};

export default DataFetching;
