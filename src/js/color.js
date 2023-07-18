import * as BABYLON from '@babylonjs/core';


/**
 * Colors the selected face of the box with the provided color.
 *
 * @param {Mesh} box - The box in which we are going to do the coloring.
 * @param {Color4} curColor - The color that we are going to apply to the selected face.
 */
const doColoring = (box, curColor) => {
    // Get the indices and positions of the box
    const indices = box.getIndices();
    const positions = box.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    
    // Calculate the total number of vertices in the box
    const nbVertices = positions.length / 3;
    
    // Create an array to store the colors of each vertex, initialized to all ones (white)
    var colors = new Array(4 * nbVertices).fill(1);

    // Iterate over the vertices of the selected face (the selected face is stored in globalThis.selectedFace)
    for (var i = 0; i < 6; i++) {
        // Get the index of the vertex in the indices array based on the selected face
        const vertex = indices[3 * globalThis.selectedFace + i];

        // Set the color components (r, g, b, a) for the current vertex based on the provided curColor
        colors[4 * vertex] = curColor.r;
        colors[4 * vertex + 1] = curColor.g;
        colors[4 * vertex + 2] = curColor.b;
        colors[4 * vertex + 3] = curColor.a;
    }

    // Set the vertex colors of the box based on the updated colors array
    box.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
};


/**
 * Resets the box to its original colorless state by setting all vertex colors to white.
 *
 * @param {Mesh} box - The box that we are going to revert back.
 */
const resetColor = (box) => {
    // Get the positions of the vertices in the box
    const positions = box.getVerticesData(BABYLON.VertexBuffer.PositionKind);

    // Calculate the total number of vertices in the box
    const nbVertices = positions.length / 3;

    // Create an array to store the colorless state for each vertex (all components set to 1, indicating white)
    const colors = new Array(4 * nbVertices).fill(1);

    // Set the vertex colors of the box to the colorless state
    box.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
};


export {
    doColoring,
    resetColor
};
