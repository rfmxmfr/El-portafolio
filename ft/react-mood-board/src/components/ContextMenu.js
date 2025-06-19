import React from 'react';

const ContextMenu = ({ x, y, onClose, onDelete, onDuplicate, onBringToFront, onSendToBack }) => {
  const menuRef = React.useRef(null);

  React.useEffect(() => {
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

export default ContextMenu;
