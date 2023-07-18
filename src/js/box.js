import { extrusion } from './extrusion';
import { DIRECTION } from './constants';
import { calculateWorldCoordinates } from './helper';


/**
 * Resizes the selected face of the box based on the cursor movement.
 *
 * @param {Event} event - Pointer move event.
 * @param {Engine} engine - The Babylon.js engine on which the scene is running.
 * @param {Scene} scene - The Babylon.js scene on which the box is placed.
 * @param {Camera} camera - The Babylon.js camera used in the current scene.
 * @param {Mesh} box - The box that we are going to resize.
 * @returns {Mesh} - The resized box.
 */
const resizeBox = (event, engine, scene, camera, box) => {
    // Check if it's the second click on the same face
    if (globalThis.clickCounter === 2 && globalThis.selectedFace === globalThis.coloredFace) {
        // Get the position of the cursor
        const pointerX = event.clientX;
        const pointerY = event.clientY;

        // Calculate the 3D world coordinates based on the cursor's position
        const pickedPoint = calculateWorldCoordinates(engine, camera, pointerX, pointerY);

        if (pickedPoint) {
            if (globalThis.selectedFace >= 0 && globalThis.selectedFace <= 3) {
                // Resize based on front or back face
                if (!globalThis.prevPoint) {
                    globalThis.prevPoint = pickedPoint.z;
                } else {
                    if (globalThis.selectedFace === 0 || globalThis.selectedFace === 1) {
                        // Extrude the box's front face
                        if (box.scaling.z + (pickedPoint.z - globalThis.prevPoint) >= 1) {
                            box = extrusion(scene, box, DIRECTION.front, (pickedPoint.z - globalThis.prevPoint));
                            globalThis.prevPoint = pickedPoint.z;
                        }
                    } else if (globalThis.selectedFace === 2 || globalThis.selectedFace === 3) {
                        // Extrude the box's back face
                        if (box.scaling.z + (globalThis.prevPoint - pickedPoint.z) >= 1) {
                            box = extrusion(scene, box, DIRECTION.back, (globalThis.prevPoint - pickedPoint.z));
                            globalThis.prevPoint = pickedPoint.z;
                        }
                    }
                }
            } else if (globalThis.selectedFace >= 4 && globalThis.selectedFace <= 7) {
                // Resize based on right or left face
                if (!globalThis.prevPoint) {
                    globalThis.prevPoint = pickedPoint.x;
                } else {
                    if (globalThis.selectedFace === 4 || globalThis.selectedFace === 5) {
                        // Extrude the box's right face
                        if (box.scaling.x + (pickedPoint.x - globalThis.prevPoint) >= 1) {
                            box = extrusion(scene, box, DIRECTION.right, (pickedPoint.x - globalThis.prevPoint));
                            globalThis.prevPoint = pickedPoint.x;
                        }
                    } else if (globalThis.selectedFace === 6 || globalThis.selectedFace === 7) {
                        // Extrude the box's left face
                        if (box.scaling.x + (globalThis.prevPoint - pickedPoint.x) >= 1) {
                            box = extrusion(scene, box, DIRECTION.left, (globalThis.prevPoint - pickedPoint.x));
                            globalThis.prevPoint = pickedPoint.x;
                        }
                    }
                }
            } else if (globalThis.selectedFace >= 8 && globalThis.selectedFace <= 11) {
                // Resize based on top or bottom face
                if (!globalThis.prevPoint) {
                    globalThis.prevPoint = pickedPoint.y;
                } else {
                    if (globalThis.selectedFace === 8 || globalThis.selectedFace === 9) {
                        // Extrude the box's top face
                        if (box.scaling.y + (pickedPoint.y - globalThis.prevPoint) >= 1) {
                            box = extrusion(scene, box, DIRECTION.top, (pickedPoint.y - globalThis.prevPoint));
                            globalThis.prevPoint = pickedPoint.y;
                        }
                    } else if (globalThis.selectedFace === 10 || globalThis.selectedFace === 11) {
                        // Extrude the box's bottom face
                        if (box.scaling.y + (globalThis.prevPoint - pickedPoint.y) >= 1) {
                            box = extrusion(scene, box, DIRECTION.bottom, (globalThis.prevPoint - pickedPoint.y));
                            globalThis.prevPoint = pickedPoint.y;
                        }
                    }
                }
            }
        }
    }

    return box;
};


export {
    resizeBox
};
