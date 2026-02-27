export const render = display => {
  let output = '';

  for (let y = 0; y < display.height; y++) {
    for (let x = 0; x < display.width; x++) {
      const pixel = display.getPixel(x, y);
      output += pixel ? '██' : ' ';
    }
    output += '\n';
  }
  console.clear();
  console.log(output);
}
