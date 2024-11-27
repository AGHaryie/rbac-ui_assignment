import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Shield, Settings, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: BarChart2, label: 'Dashboard', description: 'Overview & Analytics' },
    { path: '/users', icon: Users, label: 'Users', description: 'Manage Users' },
    { path: '/roles', icon: Shield, label: 'Roles', description: 'Access Control' },
    { path: '/settings', icon: Settings, label: 'Settings', description: 'System Settings' }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white w-72 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-3 px-6">
        <Shield className="h-10 w-10 text-blue-400" />
        <div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">RBAC UI</span>
          <p className="text-xs text-gray-400">Management Dashboard</p>
        </div>
      </div>
      
      <nav className="space-y-2 px-4">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <div>
              <span className="font-medium">{item.label}</span>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;