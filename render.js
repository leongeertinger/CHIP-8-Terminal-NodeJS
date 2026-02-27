let firstRender = true;
console.clear();

export const render = display => {
  let output = '';

  if (firstRender) {
    output += '\x1b[2j'; //clears screen
    firstRender = false;
  }

  output += '\x1b[0;0H'; //moves marker to top left

  for (let y = 0; y < display.height; y++) {
    for (let x = 0; x < display.width; x++) {
      const pixel = display.getPixel(x, y);
      output += pixel ? '██' : ' ';
    }
    output += '\n';
  }
  process.stdout.write(output);
}
