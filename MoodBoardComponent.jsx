import React, { useEffect, useRef } from 'react';
import './App.css'; // Assuming App.css contains the necessary CSS for .grid-container, .grid-item, etc.

// This is a direct conversion of the provided vanilla JavaScript MoodBoard class.
// For a full React integration, this class would typically be refactored into
// a functional component using React hooks (useState, useEffect, useRef) for state
// management and DOM manipulation.

class MoodBoardClass {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = [];
        this.draggedItem = null;
        this.isResizing = false;
        this.init();
    }

    init() {
        if (this.container) {
            this.setupEventListeners();
            this.loadSavedBoard();
        } else {
            console.error(`MoodBoard container with ID ${this.containerId} not found.`);
        }
    }

    setupEventListeners() {
        // File upload
        const fileUpload = document.getElementById("file-upload");
        if (fileUpload) {
            fileUpload.addEventListener("change", (e) => {
                this.handleFileUpload(e.target.files);
            });
        }

        // Add section button
        const addSectionBtn = document.getElementById("add-section");
        if (addSectionBtn) {
            addSectionBtn.addEventListener("click", () => {
                this.addSection();
            });
        }

        // Save board
        const saveBoardBtn = document.getElementById("save-board");
        if (saveBoardBtn) {
            saveBoardBtn.addEventListener("click", () => {
                this.saveBoard();
            });
        }

        // Drag and drop
        this.container.addEventListener("dragover", this.handleDragOver.bind(this));
        this.container.addEventListener("drop", this.handleDrop.bind(this));
    }

    addSection(content = null, gridArea = null) {
        const section = document.createElement("div");
        section.className = "grid-item";
        section.draggable = true;
        
        // Set grid position
        const area = gridArea || this.findAvailableSpace();
        section.style.gridArea = area;

        // Add content
        if (content) {
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
        section.addEventListener("dragstart", this.handleDragStart.bind(this));
        section.addEventListener("dragend", this.handleDragEnd.bind(this));
        section.addEventListener("click", this.selectItem.bind(this));
        resizeHandle.addEventListener("mousedown", this.startResize.bind(this));

        this.container.appendChild(section);
        this.items.push(section);
        
        return section;
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            this.addSection(file);
        });
    }

    findAvailableSpace() {
        // Simple algorithm to find next available 2x2 space
        const cols = 12;
        const rows = 8;
        
        for (let row = 1; row <= rows - 1; row++) {
            for (let col = 1; col <= cols - 1; col++) {
                if (this.isSpaceAvailable(row, col, 2, 2)) {
                    return `${row} / ${col} / ${row + 2} / ${col + 2}`;
                }
            }
        }
        
        // Fallback to 1x1 space
        return "1 / 1 / 2 / 2";
    }

    isSpaceAvailable(row, col, height, width) {
        // Check if space is occupied by existing items
        return !this.items.some(item => {
            const area = item.style.gridArea.split(" / ").map(Number);
            const [itemRow, itemCol, itemRowEnd, itemColEnd] = area;
            
            return !(row >= itemRowEnd || row + height <= itemRow || 
                    col >= itemColEnd || col + width <= itemCol);
        });
    }

    handleDragStart(e) {
        this.draggedItem = e.target;
        e.target.style.opacity = "0.5";
    }

    handleDragEnd(e) {
        e.target.style.opacity = "1";
        this.draggedItem = null;
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();
        if (!this.draggedItem) return;

        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate grid position based on drop coordinates
        const col = Math.floor(x / (rect.width / 12)) + 1;
        const row = Math.floor(y / (rect.height / 8)) + 1;
        
        // Update grid position
        const currentArea = this.draggedItem.style.gridArea.split(" / ");
        const width = parseInt(currentArea[3]) - parseInt(currentArea[1]);
        const height = parseInt(currentArea[2]) - parseInt(currentArea[0]);
        
        this.draggedItem.style.gridArea = `${row} / ${col} / ${row + height} / ${col + width}`;
    }

    startResize(e) {
        e.stopPropagation();
        this.isResizing = true;
        this.resizingItem = e.target.parentElement;
        
        document.addEventListener("mousemove", this.handleResize.bind(this));
        document.addEventListener("mouseup", this.stopResize.bind(this));
    }

    handleResize(e) {
        if (!this.isResizing) return;
        
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const col = Math.ceil(x / (rect.width / 12));
        const row = Math.ceil(y / (rect.height / 8));
        
        this.resizingItem.style.gridArea = `${startRow} / ${startCol} / ${row} / ${col}`;
    }

    stopResize() {
        this.isResizing = false;
        this.resizingItem = null;
        document.removeEventListener("mousemove", this.handleResize);
        document.removeEventListener("mouseup", this.stopResize);
    }

    selectItem(e) {
        // Remove previous selection
        this.items.forEach(item => item.classList.remove("selected"));
        
        // Add selection to clicked item
        e.target.classList.add("selected");
    }

    saveBoard() {
        const boardData = this.items.map(item => ({
            gridArea: item.style.gridArea,
            content: item.innerHTML,
            type: item.querySelector("img") ? "image" : 
                  item.querySelector("video") ? "video" : "empty"
        }));
        
        localStorage.setItem("moodBoard", JSON.stringify(boardData));
        alert("Board saved successfully!");
    }

    loadSavedBoard() {
        const savedData = localStorage.getItem("moodBoard");
        if (savedData) {
            const boardData = JSON.parse(savedData);
            boardData.forEach(itemData => {
                const section = this.addSection(null, itemData.gridArea);
                if (itemData.content) {
                    section.innerHTML = itemData.content;
                }
            });
        }
    }
}

// React Component Wrapper
const MoodBoardComponent = () => {
    const moodBoardRef = useRef(null);

    useEffect(() => {
        // Initialize MoodBoard only once when component mounts
        if (moodBoardRef.current) {
            new MoodBoardClass("mood-board");
        }
    }, []);

    return (
        <div id="mood-board-container">
            <div className="toolbar">
                <button id="add-section">Add Section</button>
                <input type="file" id="file-upload" accept="image/*,video/*" multiple />
                <button id="save-board">Save Board</button>
            </div>
            <div id="mood-board" className="grid-container" ref={moodBoardRef}></div>
        </div>
    );
};

export default MoodBoardComponent;


