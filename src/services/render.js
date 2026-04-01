import { ansiForeground, ansiBackground } from '../../Settings/colorConverter.js';

let firstRender = true;
console.clear();

export const render = (display, settings, settingsData) => {
  let output = '';

  if (firstRender) {
    output += '\x1b[2J'; //clears screen
    firstRender = false;
  }

  const foregroundHex = settingsData.colors[settings.foreground];
  const backgroundHex = settingsData.colors[settings.background];

  output += '\x1b[0;0H'; //moves marker to top left
  output += ansiForeground(foregroundHex); //Sets foreground in ansi.
  output += ansiBackground(backgroundHex); //Sets background in ansi.

  for (let y = 0; y < display.height; y++) {
    for (let x = 0; x < display.width; x++) {
      const pixel = display.getPixel(x, y);
      output += pixel ? '██' : '  ';
    }
    output += '\n';
  }
  output += '\x1b[0m';
  process.stdout.write(output);
}
