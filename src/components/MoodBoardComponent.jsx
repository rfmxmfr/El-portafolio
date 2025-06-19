import React, { useEffect, useState, useRef } from 'react';
import { Plus, Save, Trash } from 'lucide-react';
import { Button } from './ui/button.jsx';

function MoodBoardComponent() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Load saved items from localStorage
    const savedItems = localStorage.getItem('moodBoardItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const addItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      x: 1,
      y: 1,
      width: 3,
      height: 2,
      content: 'Drag me!'
    };
    setItems([...items, newItem]);
  };

  const removeItem = () => {
    if (selectedItem) {
      setItems(items.filter(item => item.id !== selectedItem));
      setSelectedItem(null);
    }
  };

  const saveBoard = () => {
    localStorage.setItem('moodBoardItems', JSON.stringify(items));
    alert('Mood board saved!');
  };

  const handleItemClick = (id) => {
    setSelectedItem(id === selectedItem ? null : id);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
    setSelectedItem(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const gridRect = gridRef.current.getBoundingClientRect();
    
    // Calculate grid position based on drop coordinates
    const cellWidth = gridRect.width / 12;
    const cellHeight = gridRect.height / 8;
    
    const x = Math.max(1, Math.min(12, Math.floor((e.clientX - gridRect.left) / cellWidth) + 1));
    const y = Math.max(1, Math.min(8, Math.floor((e.clientY - gridRect.top) / cellHeight) + 1));
    
    setItems(items.map(item => 
      item.id === id ? { ...item, x, y } : item
    ));
  };

  const handleResize = (e, id) => {
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const currentItem = items.find(item => item.id === id);
    const startWidth = currentItem.width;
    const startHeight = currentItem.height;
    
    const handleMouseMove = (moveEvent) => {
      const gridRect = gridRef.current.getBoundingClientRect();
      const cellWidth = gridRect.width / 12;
      const cellHeight = gridRect.height / 8;
      
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      const newWidth = Math.max(1, Math.min(12 - currentItem.x + 1, startWidth + Math.round(deltaX / cellWidth)));
      const newHeight = Math.max(1, Math.min(8 - currentItem.y + 1, startHeight + Math.round(deltaY / cellHeight)));
      
      setItems(items.map(item => 
        item.id === id ? { ...item, width: newWidth, height: newHeight } : item
      ));
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-light text-neutral-900 mb-6 text-center">Interactive Mood Board</h2>
      <p className="text-neutral-600 mb-6 text-center">Drag, resize, and arrange elements to create your design mood board.</p>
      
      <div className="toolbar">
        <Button onClick={addItem} className="flex items-center gap-2">
          <Plus size={16} /> Add Item
        </Button>
        <Button onClick={removeItem} variant="outline" className="flex items-center gap-2" disabled={!selectedItem}>
          <Trash size={16} /> Remove Selected
        </Button>
        <Button onClick={saveBoard} variant="outline" className="flex items-center gap-2">
          <Save size={16} /> Save Board
        </Button>
      </div>
      
      <div 
        ref={gridRef}
        className="grid-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {items.map(item => (
          <div
            key={item.id}
            className={`grid-item ${selectedItem === item.id ? 'selected' : ''}`}
            style={{
              gridColumnStart: item.x,
              gridColumnEnd: item.x + item.width,
              gridRowStart: item.y,
              gridRowEnd: item.y + item.height
            }}
            onClick={() => handleItemClick(item.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
          >
            <div className="p-3">{item.content}</div>
            <div 
              className="resize-handle"
              onMouseDown={(e) => handleResize(e, item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodBoardComponent;