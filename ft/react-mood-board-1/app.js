const React = require('react');
const { useState, useEffect, useRef, useCallback } = React;
const { AdminProvider, useAdmin } = require('./context/AdminContext');
const AdminDashboard = require('./components/AdminDashboard');
const AdminLogin = require('./components/AdminLogin');

// Template definitions
const MOOD_BOARD_TEMPLATES = [
  {
    id: 'minimalist',
    name: 'Minimalist Collection',
    preview: 'https://via.placeholder.com/300x200?text=Minimalist',
    description: 'Clean lines, neutral tones, and timeless silhouettes',
    layout: {
      gridSize: 20,
      padding: 20,
      background: '#f5f5f5'
    }
  },
  {
    id: 'maximalist',
    name: 'Maximalist Collection',
    preview: 'https://via.placeholder.com/300x200?text=Maximalist',
    description: 'Bold colors, dramatic textures, and statement pieces',
    layout: {
      gridSize: 25,
      padding: 30,
      background: '#ffffff'
    }
  }
];

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const snapToGrid = (value, gridSize) => Math.round(value / gridSize) * gridSize;

const getFileType = (file) => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  return 'unknown';
};

// Context Menu Component
const ContextMenu = ({ x, y, onClose, onDelete, onDuplicate, onBringToFront, onSendToBack }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={menuRef} className="context-menu" style={{ left: x, top: y }}>
      <button className="context-menu-item" onClick={onDuplicate}>Duplicate</button>
      <button className="context-menu-item" onClick={onBringToFront}>Bring to Front</button>
      <button className="context-menu-item" onClick={onSendToBack}>Send to Back</button>
      <button className="context-menu-item danger" onClick={onDelete}>Delete</button>
    </div>
  );
};
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      <button className="context-menu-item" onClick={onDuplicate}>
        Duplicate
      </button>
      <button className="context-menu-item" onClick={onBringToFront}>
        Bring to Front
      </button>
      <button className="context-menu-item" onClick={onSendToBack}>
        Send to Back
      </button>
      <button className="context-menu-item danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

// Mood Board Item Component
const MoodBoardItem = ({ 
  item, 
  isSelected, 
  onSelect, 
  onMove, 
  onResize, 
  onContextMenu,
  boardSettings 
}) => {
  const itemRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeHandle, setResizeHandle] = useState(null);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    
    e.preventDefault();
    onSelect(item.id);
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - item.x,
      y: e.clientY - item.y
    });
  };

// Utility functions
const generateId = () => Math.random().toString(36).substr(2, 9);

const snapToGrid = (value, gridSize) => Math.round(value / gridSize) * gridSize;

const getFileType = (file) => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  return 'unknown';
};

// Custom hooks
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Context Menu Component
const ContextMenu = ({ x, y, onClose, onDelete, onDuplicate, onBringToFront }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{ left: x, top: y }}
    >
      <button className="context-menu-item" onClick={onDuplicate}>
        Duplicate
      </button>
      <button className="context-menu-item" onClick={onBringToFront}>
        Bring to Front
      </button>
      <button className="context-menu-item danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

// Mood Board Item Component
const MoodBoardItem = ({ 
  item, 
  isSelected, 
  onSelect, 
  onMove, 
  onResize, 
  onContextMenu,
  boardSettings 
}) => {
  const itemRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeHandle, setResizeHandle] = useState(null);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    
    e.preventDefault();
    onSelect(item.id);
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - item.x,
      y: e.clientY - item.y
    });
  };

  const handleResizeStart = (e, handle) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: item.width,
      height: item.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        const snappedX = boardSettings.gridSnap ? snapToGrid(newX, boardSettings.gridSize) : newX;
        const snappedY = boardSettings.gridSnap ? snapToGrid(newY, boardSettings.gridSize) : newY;
        
        onMove(item.id, {
          x: Math.max(0, snappedX),
          y: Math.max(0, snappedY)
        });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = item.x;
        let newY = item.y;
        
        switch (resizeHandle) {
          case 'se':
            newWidth = Math.max(50, resizeStart.width + deltaX);
            newHeight = Math.max(50, resizeStart.height + deltaY);
            break;
          case 'sw':
            newWidth = Math.max(50, resizeStart.width - deltaX);
            newHeight = Math.max(50, resizeStart.height + deltaY);
            newX = item.x + (resizeStart.width - newWidth);
            break;
          case 'ne':
            newWidth = Math.max(50, resizeStart.width + deltaX);
            newHeight = Math.max(50, resizeStart.height - deltaY);
            newY = item.y + (resizeStart.height - newHeight);
            break;
          case 'nw':
            newWidth = Math.max(50, resizeStart.width - deltaX);
            newHeight = Math.max(50, resizeStart.height - deltaY);
            newX = item.x + (resizeStart.width - newWidth);
            newY = item.y + (resizeStart.height - newHeight);
            break;
          case 'n':
            newHeight = Math.max(50, resizeStart.height - deltaY);
            newY = item.y + (resizeStart.height - newHeight);
            break;
          case 's':
            newHeight = Math.max(50, resizeStart.height + deltaY);
            break;
          case 'w':
            newWidth = Math.max(50, resizeStart.width - deltaX);
            newX = item.x + (resizeStart.width - newWidth);
            break;
          case 'e':
            newWidth = Math.max(50, resizeStart.width + deltaX);
            break;
        }
        
        if (boardSettings.gridSnap) {
          newWidth = snapToGrid(newWidth, boardSettings.gridSize);
          newHeight = snapToGrid(newHeight, boardSettings.gridSize);
          newX = snapToGrid(newX, boardSettings.gridSize);
          newY = snapToGrid(newY, boardSettings.gridSize);
        }
        
        onResize(item.id, {
          x: Math.max(0, newX),
          y: Math.max(0, newY),
          width: newWidth,
          height: newHeight
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, resizeHandle, item, onMove, onResize, boardSettings]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    onContextMenu(e, item.id);
  };

  const renderContent = () => {
    switch (item.type) {
      case 'image':
        return <img src={item.content} alt="Mood board item" draggable={false} />;
      case 'video':
        return <video src={item.content} muted loop autoPlay />;
      default:
        return (
          <div className="item-content empty">
            <div>
              <div>Empty Section</div>
              <div style={{ fontSize: '12px', marginTop: '8px' }}>
                Drop files here
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={itemRef}
      className={`mood-board-item ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        zIndex: item.zIndex
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      <div className="item-content">
        {renderContent()}
      </div>
      
      {isSelected && (
        <div className="resize-handles">
          <div className="resize-handle nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
          <div className="resize-handle n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
          <div className="resize-handle ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
          <div className="resize-handle w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
          <div className="resize-handle e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
          <div className="resize-handle sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
          <div className="resize-handle s" onMouseDown={(e) => handleResizeStart(e, 's')} />
          <div className="resize-handle se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
        </div>
      )}
    </div>
  );
};

// Main Mood Board Component
const MoodBoard = () => {
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

  const handleMove = (id, dx, dy) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, x: item.x + dx, y: item.y + dy } 
        : item
    ));
  };

  const handleResize = (id, width, height) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, width, height } 
        : item
    ));
  };

  const handleSelect = (id) => {
    setSelectedItem(id);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    if (selectedItem === id) setSelectedItem(null);
  };

  const handleDuplicate = (id) => {
    const selectedItem = items.find(item => item.id === id);
    if (selectedItem) {
      const newItem = {
        ...selectedItem,
        id: generateId(),
        x: selectedItem.x + 30,
        y: selectedItem.y + 30,
        zIndex: nextZIndex
      };
      setItems([...items, newItem]);
      setNextZIndex(nextZIndex + 1);
    }
  };

  const handleBringToFront = (id) => {
    const maxZIndex = Math.max(...items.map(item => item.zIndex));
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, zIndex: maxZIndex + 1 } 
        : item
    ));
  };

  const handleSendToBack = (id) => {
    const minZIndex = Math.min(...items.map(item => item.zIndex));
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, zIndex: minZIndex - 1 } 
        : item
    ));
  };

  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      item: item
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setBoardSettings(template.layout);
  };

  const { isAdmin } = useAdmin();

  return (
    <div className="mood-board-container">
      {isAdmin && (
        <button 
          className="admin-button secondary" 
          style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}
          onClick={onAdminClick}
        >
          Admin
        </button>
      )}
      <div className="toolbar">
        <div className="template-selector">
          <select 
            value={selectedTemplate?.id || ''}
            onChange={(e) => {
              const template = MOOD_BOARD_TEMPLATES.find(t => t.id === e.target.value);
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
            onSelect={handleSelect}
            onMove={handleMove}
            onResize={handleResize}
            onContextMenu={(e) => handleContextMenu(e, item)}
            boardSettings={boardSettings}
          />
        ))}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onDelete={() => handleDelete(contextMenu.item.id)}
          onDuplicate={() => handleDuplicate(contextMenu.item.id)}
          onBringToFront={() => handleBringToFront(contextMenu.item.id)}
          onSendToBack={() => handleSendToBack(contextMenu.item.id)}
        />
      )}
    </div>
  );
};


  const handleLoadBoard = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const boardData = JSON.parse(event.target.result);
        if (boardData.items) {
          setItems(boardData.items);
        }
        if (boardData.boardSettings) {
          setBoardSettings(boardData.boardSettings);
        }
        
        const maxZ = Math.max(...boardData.items.map(item => item.zIndex), 0);
        setNextZIndex(maxZ + 1);
      } catch (error) {
        alert('Error loading board file');
      }
    };
    reader.readAsText(file);
  };

  const toggleGrid = () => {
    setBoardSettings(prev => ({ ...prev, showGrid: !prev.showGrid }));
  };

  const toggleGridSnap = () => {
    setBoardSettings(prev => ({ ...prev, gridSnap: !prev.gridSnap }));
  };

  return (
    <div className="mood-board-app">
      <div className="toolbar">
        <div className="toolbar-title">Interactive Mood Board</div>
        
        <div className="toolbar-group">
          <button className="btn btn--primary" onClick={handleAddSection}>
            Add Section
          </button>
          
          <label className="file-upload-zone">
            <input
              ref={fileInputRef}
              type="file"
              className="file-upload-input"
              accept="image/*,video/*"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            Upload Files
          </label>
        </div>
        
        <div className="toolbar-group">
          <button 
            className={`btn ${boardSettings.showGrid ? 'btn--primary' : 'btn--secondary'}`}
            onClick={toggleGrid}
          >
            {boardSettings.showGrid ? 'Hide Grid' : 'Show Grid'}
          </button>
          
          <button 
            className={`btn ${boardSettings.gridSnap ? 'btn--primary' : 'btn--secondary'}`}
            onClick={toggleGridSnap}
          >
            {boardSettings.gridSnap ? 'Snap: On' : 'Snap: Off'}
          </button>
        </div>
        
        <div className="toolbar-group">
          <button className="btn btn--secondary" onClick={handleSaveBoard}>
            Export Board
          </button>
          
          <label className="btn btn--secondary">
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleLoadBoard}
            />
            Import Board
          </label>
        </div>
      </div>

      <div className="mood-board-container">
        <div
          ref={canvasRef}
          className={`mood-board-canvas ${!boardSettings.showGrid ? 'hide-grid' : ''}`}
          onClick={handleCanvasClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragOver && (
            <div className="drop-zone-overlay active">
              Drop files here to add to mood board
            </div>
          )}
          
          {items.map(item => (
            <MoodBoardItem
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelect={handleItemSelect}
              onMove={handleItemMove}
              onResize={handleItemResize}
              onContextMenu={handleContextMenu}
              boardSettings={boardSettings}
            />
          ))}
        </div>
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onDelete={handleDeleteSelected}
          onDuplicate={handleDuplicate}
          onBringToFront={handleBringToFront}
        />
      )}

      <div className={`save-indicator ${saveIndicator ? 'show' : ''}`}>
        Board saved automatically
      </div>
    </div>
  );
};

// Render the application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: false,
      isAdminDashboardOpen: false
    };
  }

  handleAdminClick = () => {
    const { isAdmin } = useAdmin();
    if (!isAdmin) {
      this.setState({ isLoginOpen: true });
    } else {
      this.setState({ isAdminDashboardOpen: true });
    }
  };

  render() {
    const { isLoginOpen, isAdminDashboardOpen } = this.state;

    return (
      <AdminProvider>
        <div className="app">
          {isAdminDashboardOpen && (
            <AdminDashboard onClose={() => this.setState({ isAdminDashboardOpen: false })} />
          )}
          {isLoginOpen && (
            <AdminLogin onClose={() => this.setState({ isLoginOpen: false })} />
          )}
          <MoodBoard onAdminClick={this.handleAdminClick} />
        </div>
      </AdminProvider>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);