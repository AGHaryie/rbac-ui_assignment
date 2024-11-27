import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ansh Agrawal', email: 'anshagrawal@gmail.com', role: 'Admin', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Kirandeep Kaur', email: 'kirandeepkaur@gmail.com', role: 'Editor', status: 'Active', lastActive: '5 hours ago' },
    { id: 3, name: 'Akash Bansal', email: 'akashbansal@gmail.com', role: 'Viewer', status: 'Inactive', lastActive: '1 day ago' },
    { id: 4, name: 'Rohit Kumawat', email: 'rohitkumawat@gmail.com', role: 'Editor', status: 'Active', lastActive: '7 day ago' },
   
  ]);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access with all privileges',
      permissions: ['Create', 'Read', 'Update', 'Delete'],
      users: 3,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Can modify and publish content',
      permissions: ['Read', 'Update'],
      users: 5,
      color: 'green'
    },
    {
      id: 3,
      name: 'Viewer',
      description: 'View-only access to content',
      permissions: ['Read'],
      users: 8,
      color: 'yellow'
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', time: '2 hours ago', read: false },
    { id: 2, message: 'System update completed', time: '4 hours ago', read: false },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const addUser = (user) => {
    setUsers(prev => [...prev, { ...user, id: Date.now(), lastActive: 'Just now' }]);
    addNotification(`New user ${user.name} added`);
  };

  const updateUser = (id, updatedUser) => {
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...updatedUser } : user));
    addNotification(`User ${updatedUser.name} updated`);
  };

  const deleteUser = (id) => {
    const user = users.find(u => u.id === id);
    setUsers(prev => prev.filter(user => user.id !== id));
    addNotification(`User ${user.name} deleted`);
  };

  const addRole = (role) => {
    setRoles(prev => [...prev, { ...role, id: Date.now(), users: 0 }]);
    addNotification(`New role ${role.name} created`);
  };

  const updateRole = (id, updatedRole) => {
    setRoles(prev => prev.map(role => role.id === id ? { ...role, ...updatedRole } : role));
    addNotification(`Role ${updatedRole.name} updated`);
  };

  const deleteRole = (id) => {
    const role = roles.find(r => r.id === id);
    setRoles(prev => prev.filter(role => role.id !== id));
    addNotification(`Role ${role.name} deleted`);
  };

  const addNotification = (message) => {
    setNotifications(prev => [
      { id: Date.now(), message, time: 'Just now', read: false },
      ...prev
    ]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    users,
    roles,
    notifications,
    sidebarOpen,
    searchQuery,
    setSearchQuery,
    setSidebarOpen,
    addUser,
    updateUser,
    deleteUser,
    addRole,
    updateRole,
    deleteRole,
    addNotification,
    markNotificationAsRead,
    clearNotifications
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);