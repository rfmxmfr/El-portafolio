import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const AdminDashboard = ({ onClose }) => {
  const [templates, setTemplates] = useState([]);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    gridSize: 20,
    padding: 20,
    background: '#f5f5f5'
  });

  const { logout } = useAdmin();

  const handleTemplateChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTemplate = () => {
    if (newTemplate.name) {
      setTemplates([...templates, newTemplate]);
      setNewTemplate({
        name: '',
        description: '',
        gridSize: 20,
        padding: 20,
        background: '#f5f5f5'
      });
    }
  };

  const handleDeleteTemplate = (index) => {
    setTemplates(templates.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={logout} className="admin-button danger">Logout</button>
      </div>

      <div className="admin-section">
        <h3>Manage Templates</h3>
        <div className="template-form">
          <input
            type="text"
            name="name"
            value={newTemplate.name}
            onChange={handleTemplateChange}
            placeholder="Template Name"
            className="admin-input"
          />
          <input
            type="text"
            name="description"
            value={newTemplate.description}
            onChange={handleTemplateChange}
            placeholder="Description"
            className="admin-input"
          />
          <input
            type="number"
            name="gridSize"
            value={newTemplate.gridSize}
            onChange={handleTemplateChange}
            placeholder="Grid Size"
            className="admin-input"
          />
          <input
            type="number"
            name="padding"
            value={newTemplate.padding}
            onChange={handleTemplateChange}
            placeholder="Padding"
            className="admin-input"
          />
          <input
            type="color"
            name="background"
            value={newTemplate.background}
            onChange={handleTemplateChange}
            className="admin-input"
          />
          <button onClick={handleAddTemplate} className="admin-button">Add Template</button>
        </div>

        <div className="template-list">
          {templates.map((template, index) => (
            <div key={index} className="template-item">
              <div className="template-preview" style={{
                background: template.background,
                padding: `${template.padding}px`
              }}>
                <span className="template-name">{template.name}</span>
              </div>
              <button 
                onClick={() => handleDeleteTemplate(index)} 
                className="admin-button danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onClose} className="admin-button">Close Dashboard</button>
    </div>
  );
};

export default AdminDashboard;
