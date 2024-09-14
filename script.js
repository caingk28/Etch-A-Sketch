const gridContainer = document.getElementById('grid-container');
const resetButton = document.getElementById('reset');
const rainbowButton = document.getElementById('rainbow-mode');
const gradientButton = document.getElementById('gradient-mode');
const darkenButton = document.getElementById('darken-mode');
const eraserButton = document.getElementById('eraser');
const toggleDrawButton = document.getElementById('toggle-draw');
const toggleGridButton = document.getElementById('toggle-grid');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const fullscreenButton = document.getElementById('fullscreen');
const shapeSelect = document.getElementById('shape-select');
const colorPicker = document.getElementById('color-picker');

let currentColor = '#000000';
let isRainbowMode = false;
let isGradientMode = false;
let isDarkenMode = false;
let isEraser = false;
let isDrawing = true;
let currentShape = 'square';

let undoStack = [];
let redoStack = [];

let gradientStartColor = [0, 0, 0];
let gradientEndColor = [255, 255, 255];
let gradientStep = 0;

function createGrid(size) {
    gridContainer.innerHTML = '';
    const containerWidth = gridContainer.clientWidth;
    const containerHeight = gridContainer.clientHeight;
    const squareSize = Math.min(containerWidth, containerHeight) / size;

    gridContainer.style.width = `${squareSize * size}px`;
    gridContainer.style.height = `${squareSize * size}px`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add(`grid-${currentShape}`);
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.addEventListener('pointerdown', startDrawing);
        square.addEventListener('pointerenter', draw);
        square.addEventListener('pointerup', stopDrawing);
        gridContainer.appendChild(square);
    }
}

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    if (!e.target.classList.contains('grid-square') && 
        !e.target.classList.contains('grid-circle') && 
        !e.target.classList.contains('grid-triangle') && 
        !e.target.classList.contains('grid-diamond')) return;

    const oldColor = e.target.style.backgroundColor;
    let newColor;

    if (isEraser) {
        newColor = '';
    } else if (isRainbowMode) {
        newColor = getRandomColor();
    } else if (isGradientMode) {
        newColor = getGradientColor();
    } else if (isDarkenMode) {
        newColor = darkenColor(oldColor);
    } else {
        newColor = currentColor;
    }

    if (oldColor !== newColor) {
        undoStack.push({element: e.target, oldColor: oldColor});
        redoStack = [];
        e.target.style.backgroundColor = newColor;
    }
}

function stopDrawing() {
    isDrawing = false;
}

function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function getGradientColor() {
    const r = Math.floor(gradientStartColor[0] + (gradientEndColor[0] - gradientStartColor[0]) * gradientStep);
    const g = Math.floor(gradientStartColor[1] + (gradientEndColor[1] - gradientStartColor[1]) * gradientStep);
    const b = Math.floor(gradientStartColor[2] + (gradientEndColor[2] - gradientStartColor[2]) * gradientStep);
    gradientStep = (gradientStep + 0.01) % 1;
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color) {
    if (!color) return 'rgb(230, 230, 230)';
    let [r, g, b] = color.match(/\d+/g).map(Number);
    return `rgb(${Math.max(r - 25, 0)}, ${Math.max(g - 25, 0)}, ${Math.max(b - 25, 0)})`;
}

function resetGrid() {
    const gridSizeInput = document.getElementById('grid-size');
    let newSize = parseInt(gridSizeInput.value);

    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100.');
        return;
    }

    createGrid(newSize);
    undoStack = [];
    redoStack = [];
}

function undo() {
    if (undoStack.length === 0) return;
    const action = undoStack.pop();
    redoStack.push({element: action.element, oldColor: action.element.style.backgroundColor});
    action.element.style.backgroundColor = action.oldColor;
}

function redo() {
    if (redoStack.length === 0) return;
    const action = redoStack.pop();
    undoStack.push({element: action.element, oldColor: action.element.style.backgroundColor});
    action.element.style.backgroundColor = action.oldColor;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

resetButton.addEventListener('click', resetGrid);
rainbowButton.addEventListener('click', () => {
    isRainbowMode = !isRainbowMode;
    isGradientMode = isDarkenMode = isEraser = false;
});
gradientButton.addEventListener('click', () => {
    isGradientMode = !isGradientMode;
    isRainbowMode = isDarkenMode = isEraser = false;
    gradientStep = 0;
});
darkenButton.addEventListener('click', () => {
    isDarkenMode = !isDarkenMode;
    isRainbowMode = isGradientMode = isEraser = false;
});
eraserButton.addEventListener('click', () => {
    isEraser = !isEraser;
    isRainbowMode = isGradientMode = isDarkenMode = false;
});
toggleDrawButton.addEventListener('click', () => isDrawing = !isDrawing);
toggleGridButton.addEventListener('click', () => gridContainer.classList.toggle('grid-lines'));
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);
fullscreenButton.addEventListener('click', toggleFullscreen);
shapeSelect.addEventListener('change', (e) => {
    currentShape = e.target.value;
    const size = Math.sqrt(gridContainer.children.length);
    createGrid(size);
});
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    isRainbowMode = isGradientMode = isDarkenMode = isEraser = false;
});

// Initialize with a 16x16 grid
createGrid(16);

// Add event listener for window resize
window.addEventListener('resize', () => {
    const size = Math.sqrt(gridContainer.children.length);
    createGrid(size);
});

// Prevent dragging
gridContainer.addEventListener('dragstart', (e) => e.preventDefault());

// Touch support
gridContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && (target.classList.contains('grid-square') || 
                   target.classList.contains('grid-circle') ||
                   target.classList.contains('grid-triangle') ||
                   target.classList.contains('grid-diamond'))) {
        startDrawing({target: target, preventDefault: () => {}});
    }
});

gridContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && (target.classList.contains('grid-square') || 
                   target.classList.contains('grid-circle') ||
                   target.classList.contains('grid-triangle') ||
                   target.classList.contains('grid-diamond'))) {
        draw({target: target});
    }
});

gridContainer.addEventListener('touchend', stopDrawing);