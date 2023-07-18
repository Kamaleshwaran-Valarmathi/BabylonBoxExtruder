import * as BABYLON from '@babylonjs/core';

import { doColoring } from './color';
import { BOX, DIRECTION } from './constants';


/**
 * Extends or contracts the selected side of the box by extrusion.
 *
 * @param {Scene} scene - The scene in which the box is placed.
 * @param {Mesh} box - The box that we are going to resize.
 * @param {string} sideToExtend - The side of the box that we are going to extend or contract. (e.g., "front", "back", "left", "right", "top", "bottom")
 * @param {number} extensionAmount - The amount of extension or contraction that needs to be done. Positive value extends the side, negative contracts it.
 * @returns {Mesh} - The resized box with the specified side extended or contracted.
 */
const extrusion = (scene, box, sideToExtend, extensionAmount) => {
    // Get the box dimensions
    const boxWidth = box.scaling.x;
    const boxHeight = box.scaling.y;
    const boxDepth = box.scaling.z;

    const xCord = box.position.x;
    const yCord = box.position.y;
    const zCord = box.position.z;

    // Define variables to store the dimensions of the extended side
    var extendedWidth, extendedHeight, extendedDepth;

    // Define the dimensions of the extended side based on the sideToExtend parameter
    if (sideToExtend === DIRECTION.front || sideToExtend === DIRECTION.back) {
        extendedWidth = boxWidth;
        extendedHeight = boxHeight;
        extendedDepth = boxDepth + extensionAmount;
    } else if (sideToExtend === DIRECTION.left || sideToExtend === DIRECTION.right) {
        extendedWidth = boxWidth + extensionAmount;
        extendedHeight = boxHeight;
        extendedDepth = boxDepth;
    } else if (sideToExtend === DIRECTION.top || sideToExtend === DIRECTION.bottom) {
        extendedWidth = boxWidth;
        extendedHeight = boxHeight + extensionAmount;
        extendedDepth = boxDepth;
    }

    // Check if the extended dimensions are valid (non-negative)
    if (extendedWidth < 1 || extendedHeight < 1 || extendedDepth < 1)
        return; // If the extension would result in non-positive dimensions, return without making any changes.

    // Define the position of the extended side
    var extendedPosition;
    switch (sideToExtend) {
        case DIRECTION.front:
            extendedPosition = new BABYLON.Vector3(xCord, yCord, zCord + (extensionAmount / 2));
            break;
        case DIRECTION.back:
            extendedPosition = new BABYLON.Vector3(xCord, yCord, zCord - (extensionAmount / 2));
            break;
        case DIRECTION.left:
            extendedPosition = new BABYLON.Vector3(xCord - (extensionAmount / 2), yCord, zCord);
            break;
        case DIRECTION.right:
            extendedPosition = new BABYLON.Vector3(xCord + (extensionAmount / 2), yCord, zCord);
            break;
        case DIRECTION.top:
            extendedPosition = new BABYLON.Vector3(xCord, yCord + (extensionAmount / 2), zCord);
            break;
        case DIRECTION.bottom:
            extendedPosition = new BABYLON.Vector3(xCord, yCord - (extensionAmount / 2), zCord);
            break;
    }

    // Dispose of the current box to create a new one with the updated dimensions and position
    box.dispose();
    box = BABYLON.MeshBuilder.CreateBox(BOX.name, {}, scene);

    // Set the new scaling and position for the box
    box.scaling = new BABYLON.Vector3(extendedWidth, extendedHeight, extendedDepth);
    box.position = extendedPosition;

    // Color the box to indicate the extension using the 'doColoring' function
    box = doColoring(box, new BABYLON.Color4(255, 255, 0, 1)); // Yellow color is applied to the extended side

    return box; // Return the resized box with the specified side extended or contracted.
};


export {
    extrusion
};
