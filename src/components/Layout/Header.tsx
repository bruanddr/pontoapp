import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, title }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-[#1c1c1b] ml-2 lg:ml-0">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#f23f35] text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-[#ffb71b] rounded-full flex items-center justify-center text-[#1c1c1b] font-semibold">
              {user?.nome?.[0]}{user?.sobrenome?.[0]}
            </div>
            <span className="text-sm font-medium text-[#1c1c1b] hidden md:block">
              {user?.nome} {user?.sobrenome}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;