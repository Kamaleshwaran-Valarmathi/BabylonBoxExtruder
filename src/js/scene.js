import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui/2D';

import { resizeBox } from './box';
import { getRestButton } from './button';
import { ADVANCED_TEXTURE, BOX, CAMERA, LIGHT, LOWER_RADIUS_LIMIT, UPPER_RADIUS_LIMIT } from './constants';
import { initalizeGlobalVariables, resetGlobalVariables } from './helper';


/**
 * Creates and returns a Babylon.js scene.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element where the scene will be placed.
 * @param {Engine} engine - The Babylon.js engine on which this scene will run.
 * @returns {Scene} - The created Babylon.js scene.
 */
const createScene = (canvas, engine) => {
  // Create a new Babylon.js scene using the given engine
  const scene = new BABYLON.Scene(engine);

  // Create a camera and position it
  var camera = new BABYLON.ArcRotateCamera(CAMERA.name, 2.5, 1, 3, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = LOWER_RADIUS_LIMIT; // Set the minimum allowed camera distance from the scene's center
  camera.upperRadiusLimit = UPPER_RADIUS_LIMIT; // Set the maximum allowed camera distance from the scene's center

  // Create a light source (HemisphericLight) to provide ambient lighting in the scene
  const light = new BABYLON.HemisphericLight(LIGHT.name, new BABYLON.Vector3(0.5, 1, 0), scene);

  // Create a box (MeshBuilder.CreateBox) with a size of 1
  var box = BABYLON.MeshBuilder.CreateBox(BOX.name, { size: 1 }, scene);

  // Temporary global variables to keep track of the selected face and scaling
  globalThis.selectedFace = null;
  globalThis.clickCounter = 0;
  globalThis.coloredFace = null;
  globalThis.prevPoint = undefined;

  // Register event handlers for pointer interactions with the scene
  scene.onPointerDown = (evt, pickResult) => {
    [ camera, box ] = initalizeGlobalVariables(camera, box, pickResult);
  };

  scene.onPointerMove = function (evt) {
      box = resizeBox(evt, engine, scene, camera, box);
  };

  scene.onPointerUp = function () {
      [ camera, box ] = resetGlobalVariables(camera, box);
  };

  // Create an AdvancedDynamicTexture (GUI) to add UI controls on top of the scene
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(ADVANCED_TEXTURE.name);

  // Create and add a reset button to the GUI
  const resetButton = getRestButton();
  resetButton.onPointerUpObservable.add(() => {
    [ camera, box ] = resetScene(scene, camera, box)
  });
  advancedTexture.addControl(resetButton);

  // Return the created scene
  return scene;
};


/**
 * Resets the values of the scene, camera, and box to their initial states.
 *
 * @param {Scene} scene - The current Babylon.js scene to reset.
 * @param {Camera} camera - The camera of the current scene to reset.
 * @param {Mesh} box - The box which is placed in our scene to reset.
 * @returns {Array} An array containing the updated camera and box after the reset.
 */
const resetScene = (scene, camera, box) => {
  // Dispose of the existing box to remove it from the scene
  box.dispose();

  // Create a new box mesh with a size of 1 and add it back to the scene
  box = BABYLON.MeshBuilder.CreateBox(BOX.name, { size: 1 }, scene);

  // Reset the camera's alpha, beta, and radius values to their initial states
  camera.alpha = 2.5; // Set the camera's horizontal rotation angle to 2.5 radians
  camera.beta = 1; // Set the camera's vertical rotation angle to 1 radian
  camera.radius = 3; // Set the camera's distance from the scene's center to 3 units

  // Return an array containing the updated camera and box after the reset
  return [ camera, box ];
};


export { 
    createScene
};
