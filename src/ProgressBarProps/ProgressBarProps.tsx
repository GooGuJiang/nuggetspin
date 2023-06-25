import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className }) => {
  return (
    <div className={`relative pt-1 ${className}`}>
      <div className="overflow-hidden h-2 mb-4 text-xs flex bg-gray-200 bg-opacity-50 fixed top-0 w-full">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
