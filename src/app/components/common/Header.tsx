import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, rightContent }) => {
  return (
    <div className="flex items-center justify-between  bg-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
};

export default Header;
