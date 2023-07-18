import * as BABYLON from '@babylonjs/core';

import { createScene } from './scene';


/**
 * Creates and renders the Babylon.js scene continuously.
 */
window.addEventListener('DOMContentLoaded', () => {
  // Get the canvas element by its ID 'renderCanvas'
  const canvas = document.getElementById('renderCanvas');

  // Create a Babylon.js engine with the canvas and enable WebGL rendering
  const engine = new BABYLON.Engine(canvas, true);

  // Create the Babylon.js scene using the createScene function (not shown here)
  const scene = createScene(canvas, engine);

  // Start the render loop using the engine's runRenderLoop method
  // The render loop continuously renders the scene at the desired frame rate
  engine.runRenderLoop(() => scene.render());

  // Handle window resize to adjust the canvas size and maintain aspect ratio
  window.addEventListener('resize', () => engine.resize());
});
