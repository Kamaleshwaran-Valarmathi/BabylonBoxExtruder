import * as BABYLON from '@babylonjs/core';

import { doColoring, resetColor } from './color';
import { BOX } from './constants';


/**
 * Helper function to calculate the 3D world coordinates from a 2D cursor pointer.
 *
 * @param {Engine} engine - The Babylon.js engine on which the scene is running.
 * @param {Camera} camera - The camera of the current scene.
 * @param {number} pointerX - The X-coordinate of the 2D cursor.
 * @param {number} pointerY - The Y-coordinate of the 2D cursor.
 * @returns {Vector3} - The calculated 3D world coordinates.
 */
const calculateWorldCoordinates = (engine, camera, pointerX, pointerY) => {
    // Create an identity matrix
    const matrix = BABYLON.Matrix.Identity();

    // Unproject the 2D cursor pointer into 3D world coordinates
    // using the provided pointerX and pointerY values, along with the engine's render width and height,
    // the view matrix of the camera, and the projection matrix of the camera.
    const worldCoordinates = BABYLON.Vector3.Unproject(
        new BABYLON.Vector3(pointerX, pointerY, 0),
        engine.getRenderWidth(),
        engine.getRenderHeight(),
        matrix,
        camera.getViewMatrix(),
        camera.getProjectionMatrix()
    );

    return worldCoordinates; // Return the calculated 3D world coordinates.
};


/**
 * Initializes all the global variables to their desired values based on the click action.
 *
 * @param {Camera} camera - The camera of the current scene.
 * @param {Mesh} box - The box which is placed in our scene.
 * @param {PickingInfo} pickResult - The result of the cursor click action (picking info).
 * @returns {Array} - An array containing the updated camera and box after initializing global variables.
 */
const initalizeGlobalVariables = (camera, box, pickResult) => {
    globalThis.clickCounter += 1;

    // Check if a mesh was clicked
    if (pickResult.hit && pickResult.pickedMesh.name === BOX.name) {
        // Check if a face was clicked
        if (pickResult.faceId !== -1) {
            // Calculate the selected face index based on the clicked faceId
            globalThis.selectedFace = 2 * Math.floor(pickResult.faceId / 2);

            // If this is the first click, color the selected face and store it in globalThis.coloredFace
            if (globalThis.clickCounter === 1) {
                box = doColoring(box, new BABYLON.Color4(0, 173, 239, 1)); // Color the face with a blue color (RGB: 0, 173, 239, Alpha: 1)
                globalThis.coloredFace = globalThis.selectedFace; // Store the selected face in globalThis.coloredFace
            }

            // Disable camera panning and rotation around X and Y axes to prevent camera movement during resizing
            camera.panningSensibility = 1000000;
            camera.angularSensibilityX = 1000000;
            camera.angularSensibilityY = 1000000;
        }
    }

    // Return an array containing the updated camera and box after initializing global variables
    return [ camera, box ];
};


/**
 * Resets all the global variables to their initial values.
 *
 * @param {Camera} camera - The camera of the current scene.
 * @param {Mesh} box - The box which is placed in our scene.
 * @returns {Array} - An array containing the updated camera and box after resetting global variables.
 */
const resetGlobalVariables = (camera, box) => {
    // Check if two clicks have occurred or if no face was colored yet
    if (globalThis.clickCounter === 2 || globalThis.coloredFace === null) {
        if (globalThis.coloredFace !== null)
            box = resetColor(box); // Reset the color of the previously colored face to its original colorless state
        globalThis.coloredFace = null; // Reset the coloredFace variable to indicate that no face is currently colored
        globalThis.clickCounter = 0; // Reset the clickCounter to 0 to indicate no clicks have occurred
    }

    // Reset the selectedFace, prevPoint, and camera sensitivity variables
    globalThis.selectedFace = null; // Reset the selectedFace variable to indicate that no face is currently selected
    globalThis.prevPoint = undefined; // Reset the prevPoint variable to indicate no previous point for resizing
    camera.panningSensibility = 1000; // Enable camera panning by setting the panning sensitivity to its default value
    camera.angularSensibilityX = 2000; // Enable camera rotation around the X-axis by setting the X-axis rotation sensitivity to its default value
    camera.angularSensibilityY = 2000; // Enable camera rotation around the Y-axis by setting the Y-axis rotation sensitivity to its default value

    // Return an array containing the updated camera and box after resetting global variables
    return [ camera, box ];
};


export {
    calculateWorldCoordinates,
    initalizeGlobalVariables,
    resetGlobalVariables
};
