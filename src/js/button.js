import * as GUI from '@babylonjs/gui/2D';

import { RESET_BUTTON } from './constants';


/**
 * Creates and returns a reset button with a custom image.
 *
 * @returns {Button} - The reset button with the specified properties.
 */
const getRestButton = () => {
  // Create a GUI button with an image using the provided reset icon image
  const resetButton = GUI.Button.CreateImageButton(RESET_BUTTON.name, 'Reset', '/src/images/reset_icon.png');

  // Define the padding value to adjust the button size and position
  const paddingValue = 32;

  // Set the width and height of the button with the padding applied
  resetButton.width = 100 + paddingValue + 'px';
  resetButton.height = 40 + paddingValue + 'px';

  // Set the corner radius of the button to create rounded corners
  resetButton.cornerRadius = 7;

  // Adjust the image position within the button
  resetButton.image.left = '10px';

  // Set the text color of the button
  resetButton.color = 'white';

  // Set the background color of the button
  resetButton.background = '#fb8500';

  // Align the button to the bottom of the screen
  resetButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

  // Align the button to the left of the screen
  resetButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

  // Add padding to the left and bottom of the button
  resetButton.paddingLeft = paddingValue + 'px';
  resetButton.paddingBottom = paddingValue + 'px';

  return resetButton;
};


export {
    getRestButton
};
