# Etch-A-Sketch Web Application

## Overview

This project is a web-based implementation of the classic Etch-A-Sketch toy. It allows users to draw on a customizable grid using various drawing modes and tools.

## Features

- Customizable grid size (1x1 to 100x100)
- Multiple drawing modes:
  - Normal (single color)
  - Rainbow (random colors)
  - Gradient (smoothly changing colors)
  - Darken (progressively darkens colors)
- Eraser tool
- Undo/Redo functionality
- Toggle grid lines
- Fullscreen mode
- Color picker for custom colors
- Shape selection (square or circle grid elements)
- Touch support for mobile devices

- Shape selection (square, circle, triangle, or diamond grid elements)

## Technical Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## File Structure
etch-a-sketch/
│
├── index.html
├── style.css
└── script.js

## Setup and Installation

1. Clone the repository or download the source files.
2. Open `index.html` in a modern web browser.

No additional setup or dependencies are required.

## Usage

### Grid Controls

- **Reset Grid**: Enter a number (1-100) in the input field and click "Reset Grid" to change the grid size.
- **Toggle Grid**: Click to show/hide grid lines.
- **Toggle Draw**: Click to enable/disable drawing.

### Drawing Modes

- **Rainbow Mode**: Draws with random colors.
- **Gradient Mode**: Draws with smoothly changing colors.
- **Darken Mode**: Progressively darkens the color of each cell.
- **Eraser**: Removes color from cells.

### Tools

- **Color Picker**: Choose a custom color for drawing.
- **Shape Select**: Choose between square or circle grid elements.
- **Undo/Redo**: Reverse or re-apply recent actions.
- **Fullscreen**: Toggle fullscreen mode for a larger drawing area.

## Key Functions

- `createGrid(size)`: Generates a new grid of the specified size.
- `draw(e)`: Handles the drawing logic based on the current mode.
- `resetGrid()`: Resets the grid to a new size based on user input.
- `undo()` / `redo()`: Manage the undo/redo stack for user actions.
- `toggleFullscreen()`: Toggles fullscreen mode.

## Event Listeners

The application uses various event listeners to handle user interactions:

- Mouse events (`pointerdown`, `pointerenter`, `pointerup`)
- Touch events for mobile support
- Button click events for mode toggles and actions
- Window resize event to maintain grid proportions

## Responsive Design

The application is designed to be responsive and works on both desktop and mobile devices. The grid automatically resizes to fit the available screen space.

## Browser Compatibility

This application is compatible with modern web browsers that support ES6+ JavaScript features. It has been tested on:

- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Microsoft Edge (latest version)
- Safari (latest version)

## Known Issues and Limitations

- Performance may degrade on very large grid sizes (e.g., 100x100) on low-end devices.
- The gradient mode resets its progression when switching to and from other modes.

## Future Enhancements

- Add ability to save and load drawings
- Implement more complex shape options for grid elements
- Add a color fill tool
- Improve mobile UI for smaller screens

## Contributing

Contributions to improve the application are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).