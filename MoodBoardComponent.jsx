import React, { useEffect, useRef } from 'react';
// Import the CSS file with the correct path
import '@/components/MoodBoard.css';

// React Component Wrapper
const MoodBoardComponent = () => {
  const moodBoardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize MoodBoard only once when component mounts
    if (!moodBoardRef.current && containerRef.current) {
      const container = document.getElementById("mood-board");
      if (container) {
        initializeMoodBoard(container);
        moodBoardRef.current = true;
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // MoodBoard functionality
  const initializeMoodBoard = (container) => {
    let items = [];
    let draggedItem = null;
    let isResizing = false;
    let resizingItem = null;
    let startRow, startCol;

    // Setup event listeners
    const fileUpload = document.getElementById("file-upload");
    if (fileUpload) {
      fileUpload.addEventListener("change", (e) => {
        handleFileUpload(e.target.files);
      });
    }

    const addSectionBtn = document.getElementById("add-section");
    if (addSectionBtn) {
      addSectionBtn.addEventListener("click", () => {
        addSection();
      });
    }

    const saveBoardBtn = document.getElementById("save-board");
    if (saveBoardBtn) {
      saveBoardBtn.addEventListener("click", () => {
        saveBoard();
      });
    }

    // Drag and drop
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("drop", handleDrop);

    // Functions
    function addSection(content = null, gridArea = null) {
      const section = document.createElement("div");
      section.className = "grid-item";
      section.draggable = true;
      
      // Set grid position
      const area = gridArea || findAvailableSpace();
      section.style.gridArea = area;

      // Add content
      if (content && content.type) {
        if (content.type.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = URL.createObjectURL(content);
          img.className = "media-content";
          section.appendChild(img);
        } else if (content.type.startsWith("video/")) {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(content);
          video.className = "media-content";
          video.controls = true;
          section.appendChild(video);
        }
      }

      // Add resize handle
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      section.appendChild(resizeHandle);

      // Event listeners
      section.addEventListener("dragstart", handleDragStart);
      section.addEventListener("dragend", handleDragEnd);
      section.addEventListener("click", selectItem);
      resizeHandle.addEventListener("mousedown", startResize);

      container.appendChild(section);
      items.push(section);
      
      return section;
    }

    function handleFileUpload(files) {
      Array.from(files).forEach(file => {
        addSection(file);
      });
    }

    function findAvailableSpace() {
      // Simple algorithm to find next available 2x2 space
      const cols = 12;
      const rows = 8;
      
      for (let row = 1; row <= rows - 1; row++) {
        for (let col = 1; col <= cols - 1; col++) {
          if (isSpaceAvailable(row, col, 2, 2)) {
            return `${row} / ${col} / ${row + 2} / ${col + 2}`;
          }
        }
      }
      
      // Fallback to 1x1 space
      return "1 / 1 / 2 / 2";
    }

    function isSpaceAvailable(row, col, height, width) {
      // Check if space is occupied by existing items
      return !items.some(item => {
        const area = item.style.gridArea.split(" / ").map(Number);
        const [itemRow, itemCol, itemRowEnd, itemColEnd] = area;
        
        return !(row >= itemRowEnd || row + height <= itemRow || 
                col >= itemColEnd || col + width <= itemCol);
      });
    }

    function handleDragStart(e) {
      draggedItem = e.target;
      e.target.style.opacity = "0.5";
    }

    function handleDragEnd(e) {
      e.target.style.opacity = "1";
      draggedItem = null;
    }

    function handleDragOver(e) {
      e.preventDefault();
    }

    function handleDrop(e) {
      e.preventDefault();
      if (!draggedItem) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate grid position based on drop coordinates
      const col = Math.floor(x / (rect.width / 12)) + 1;
      const row = Math.floor(y / (rect.height / 8)) + 1;
      
      // Update grid position
      const currentArea = draggedItem.style.gridArea.split(" / ");
      const width = parseInt(currentArea[3]) - parseInt(currentArea[1]);
      const height = parseInt(currentArea[2]) - parseInt(currentArea[0]);
      
      draggedItem.style.gridArea = `${row} / ${col} / ${row + height} / ${col + width}`;
    }

    function startResize(e) {
      e.stopPropagation();
      isResizing = true;
      resizingItem = e.target.parentElement;
      
      const currentArea = resizingItem.style.gridArea.split(" / ");
      startRow = parseInt(currentArea[0]);
      startCol = parseInt(currentArea[1]);
      
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", stopResize);
    }

    function handleResize(e) {
      if (!isResizing) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const col = Math.max(1, Math.ceil(x / (rect.width / 12)));
      const row = Math.max(1, Math.ceil(y / (rect.height / 8)));
      
      resizingItem.style.gridArea = `${startRow} / ${startCol} / ${row} / ${col}`;
    }

    function stopResize() {
      isResizing = false;
      resizingItem = null;
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    }

    function selectItem(e) {
      // Remove previous selection
      items.forEach(item => item.classList.remove("selected"));
      
      // Add selection to clicked item
      e.currentTarget.classList.add("selected");
    }

    function saveBoard() {
      const boardData = items.map(item => ({
        gridArea: item.style.gridArea,
        content: item.innerHTML,
        type: item.querySelector("img") ? "image" : 
              item.querySelector("video") ? "video" : "empty"
      }));
      
      localStorage.setItem("moodBoard", JSON.stringify(boardData));
      alert("Board saved successfully!");
    }

    function loadSavedBoard() {
      const savedData = localStorage.getItem("moodBoard");
      if (savedData) {
        try {
          const boardData = JSON.parse(savedData);
          boardData.forEach(itemData => {
            const section = addSection(null, itemData.gridArea);
            if (itemData.content) {
              section.innerHTML = itemData.content;
            }
          });
        } catch (e) {
          console.error("Error loading saved board:", e);
        }
      }
    }

    // Initialize
    loadSavedBoard();
  };

  return (
    <div id="mood-board-container" ref={containerRef}>
      <div className="toolbar">
        <button id="add-section">Add Section</button>
        <input type="file" id="file-upload" accept="image/*,video/*" multiple />
        <button id="save-board">Save Board</button>
      </div>
      <div id="mood-board" className="grid-container"></div>
    </div>
  );
};

export default MoodBoardComponent;