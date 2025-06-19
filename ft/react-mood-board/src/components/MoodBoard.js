import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MOOD_BOARD_TEMPLATES } from '../data/templates';
import ContextMenu from './ContextMenu';
import MoodBoardItem from './MoodBoardItem';

const generateId = () => Math.random().toString(36).substr(2, 9);

const getFileType = (file) => {
  const type = file.type.toLowerCase();
  if (type.startsWith('image/')) return 'image';
  if (type.startsWith('video/')) return 'video';
  return 'unknown';
};

const MoodBoard = ({ onAdminClick }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [boardSettings, setBoardSettings] = useState({
    gridSize: 20,
    padding: 20,
    background: '#f5f5f5'
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(3);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newItem = {
        id: generateId(),
        type: getFileType(file),
        x: 50,
        y: 50,
        width: 200,
        height: 200,
        zIndex: nextZIndex,
        file: file
      };
      setItems([...items, newItem]);
      setNextZIndex(nextZIndex + 1);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (template) {
      setBoardSettings({
        gridSize: template.gridSize || 20,
        padding: template.padding || 20,
        background: template.background || '#f5f5f5'
      });
    }
  };

  return (
    <div className="mood-board-container">
      <div className="toolbar">
        <div className="template-selector">
          <select
            value={selectedTemplate?.id || ''}
            onChange={(e) => {
              const template = MOOD_BOARD_TEMPLATES.find(
                t => t.id === e.target.value
              );
              handleTemplateSelect(template);
            }}
          >
            <option value="">Select a template</option>
            {MOOD_BOARD_TEMPLATES.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="upload-button">
          Add Media
        </label>
        {onAdminClick && (
          <button className="admin-button" onClick={onAdminClick}>
            Admin
          </button>
        )}
      </div>
      <div
        className="mood-board"
        style={{
          background: boardSettings.background,
          gridTemplateColumns: `repeat(auto-fill, minmax(${boardSettings.gridSize}px, 1fr))`
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {items.map((item) => (
          <MoodBoardItem
            key={item.id}
            item={item}
            isSelected={selectedItem === item.id}
            onSelect={(id) => setSelectedItem(id)}
            onMove={(id, x, y) => {
              setItems(items.map(i =>
                i.id === id ? { ...i, x, y } : i
              ));
            }}
            onResize={(id, width, height) => {
              setItems(items.map(i =>
                i.id === id ? { ...i, width, height } : i
              ));
            }}
            onContextMenu={(e, item) => {
              e.preventDefault();
              setContextMenu({
                x: e.clientX,
                y: e.clientY,
                item: item.id
              });
            }}
            boardSettings={boardSettings}
          />
        ))}
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onDelete={() => {
            setItems(items.filter(i => i.id !== contextMenu.item));
            setContextMenu(null);
          }}
          onDuplicate={() => {
            const selectedItem = items.find(i => i.id === contextMenu.item);
            if (selectedItem) {
              const newItem = {
                ...selectedItem,
                id: generateId(),
                x: selectedItem.x + 20,
                y: selectedItem.y + 20,
                zIndex: nextZIndex
              };
              setItems([...items, newItem]);
              setNextZIndex(nextZIndex + 1);
              setContextMenu(null);
            }
          }}
          onBringToFront={() => {
            const selectedItem = items.find(i => i.id === contextMenu.item);
            if (selectedItem) {
              setItems(items.map(i =>
                i.id === contextMenu.item ? { ...i, zIndex: nextZIndex } : i
              ));
              setNextZIndex(nextZIndex + 1);
              setContextMenu(null);
            }
          }}
          onSendToBack={() => {
            setItems(items.map(i =>
              i.id === contextMenu.item ? { ...i, zIndex: 1 } : i
            ));
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
};

export default MoodBoard;
