# 3D Box Resizer with Babylon.js

A simple 3D box resizer application built using Babylon.js, a powerful 3D framework for web development. This project allows users to interact with a 3D box, select its faces, and resize them based on cursor movement.

![3D Box Resizer](https://raw.githubusercontent.com/Kamaleshwaran-Valarmathi/BabylonBoxExtruder/main/assets/screenshot.png)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org) (version 12 or above) must be installed on your machine.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Kamaleshwaran-Valarmathi/BabylonBoxExtruder.git
cd BabylonBoxExtruder
```

2.  Install the dependencies:
```npm install```

# Usage
To run the application, use the following command:
```npm run dev```

Once the server is running, open your web browser and navigate to [http://localhost:5173](http://localhost:5173/) to view the 3D box resizer application.

# How to Use
- Click on any face of the 3D box to select it. The selected face will be coloured with a blue highlight.
- With the second click, hold down the mouse button and move the cursor (pointer) to resize the selected face. As you move the cursor, the box will either expand or contract accordingly.
- Release the mouse button to complete the resizing action.

# Resetting the Scene
- To reset the scene and start over, click on the "Reset" button available in the bottom left corner of the application. This will reset the camera position and remove any resizing effects applied to the box.

# Limitations
- The application is optimized for modern web browsers that support WebGL. It may not work as expected on older browsers.

# Built With
- [Babylon.js](https://www.babylonjs.com/) - A 3D framework for web development.
- [GUI 2D Library](https://doc.babylonjs.com/how_to/gui) - For creating the user interface.

# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
