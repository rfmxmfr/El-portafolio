import React, { useRef, useState } from 'react';

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

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - dragStart.x;
      const y = e.clientY - dragStart.y;
      onMove(item.id, x, y);
    } else if (isResizing) {
      const width = resizeStart.width + (e.clientX - resizeStart.x);
      const height = resizeStart.height + (e.clientY - resizeStart.y);
      onResize(item.id, width, height);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };

  const handleResizeMouseDown = (e, handle) => {
    e.preventDefault();
    setResizeHandle(handle);
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: item.width,
      height: item.height
    });
  };

  return (
    <div
      ref={itemRef}
      className={`mood-board-item ${item.type} ${isSelected ? 'selected' : ''}`}
      style={{
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        zIndex: item.zIndex
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => onContextMenu(e, item)}
    >
      {item.type === 'image' && (
        <img src={URL.createObjectURL(item.file)} alt="" />
      )}
      {item.type === 'video' && (
        <video controls>
          <source src={URL.createObjectURL(item.file)} type="video/mp4" />
        </video>
      )}
      <div className="resize-handles">
        <div
          className="resize-handle bottom-right"
          onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
        ></div>
      </div>
    </div>
  );
};

export default MoodBoardItem;
