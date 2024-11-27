// src/components/RoleManagement.js
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit2, Trash2, Users, Lock } from 'lucide-react';
import RoleModal from './modals/RoleModal';
import ConfirmDialog from './modals/ConfirmDialog';

const RoleManagement = () => {
  const { roles, addRole, updateRole, deleteRole } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, roleId: null });

  const handleAddRole = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleDeleteClick = (roleId) => {
    setConfirmDialog({
      open: true,
      roleId,
      title: 'Delete Role',
      message: 'Are you sure you want to delete this role? This action cannot be undone.'
    });
  };

  const handleConfirmDelete = () => {
    if (confirmDialog.roleId) {
      deleteRole(confirmDialog.roleId);
      setConfirmDialog({ open: false, roleId: null });
    }
  };

  const handleSaveRole = (roleData) => {
    if (selectedRole) {
      updateRole(selectedRole.id, roleData);
    } else {
      addRole(roleData);
    }
    setModalOpen(false);
};

const getColorClasses = (color) => {
  const classes = {
    blue: 'bg-blue-50 border-blue-200 shadow-blue-100',
    green: 'bg-green-50 border-green-200 shadow-green-100',
    yellow: 'bg-yellow-50 border-yellow-200 shadow-yellow-100',
    purple: 'bg-purple-50 border-purple-200 shadow-purple-100'
  };
  return classes[color] || classes.blue;
};

return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <p className="text-gray-500 mt-1">Define and manage user roles and permissions</p>
      </div>
      <button
        onClick={handleAddRole}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition duration-200"
      >
        <Plus className="h-5 w-5" />
        <span>Add Role</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roles.map(role => (
        <div 
          key={role.id} 
          className={`rounded-xl border p-6 space-y-4 transition duration-200 hover:shadow-lg ${getColorClasses(role.color)}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{role.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{role.description}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEditRole(role)}
                className="p-1.5 rounded-lg hover:bg-white transition duration-200"
              >
                <Edit2 className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={() => handleDeleteClick(role.id)}
                className="p-1.5 rounded-lg hover:bg-white transition duration-200"
              >
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="text-sm">{role.users} users assigned</span>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Permissions:</p>
            <div className="flex flex-wrap gap-2">
              {role.permissions.map(permission => (
                <span
                  key={permission}
                  className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-gray-700 flex items-center space-x-1"
                >
                  <Lock className="h-4 w-4 mr-1" />
                  <span>{permission}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {modalOpen && (
      <RoleModal
        role={selectedRole}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveRole}
      />
    )}

    <ConfirmDialog
      isOpen={confirmDialog.open}
      title={confirmDialog.title}
      message={confirmDialog.message}
      onClose={() => setConfirmDialog({ open: false, roleId: null })}
      onConfirm={handleConfirmDelete}
    />
  </div>
);
};

export default RoleManagement;