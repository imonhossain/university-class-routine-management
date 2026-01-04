import React from 'react';

interface Props {
  text?: string;
  className?: string;
}

const ErrorDisplay: React.FC<Props> = ({
  text = 'Something went wrong...',
  className = 'h-20',
}) => {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className="flex items-center">
        <h2 className="font-body text-error">{text}</h2>
      </div>
    </div>
  );
};

export default ErrorDisplay;
