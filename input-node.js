import { keymap } from './keymap.js';

export const setupInput = keypad => {
  //Rawmode for continous stream of keypresses
  process.stdin.setRawMode(true);
  process.stdin.resume();
  //encoding to convert bytes to strings
  process.stdin.setEncoding("utf8");
  //Listen for data and pass key as argument
  process.stdin.on("data", key => {
    if (key === "\u0003") process.exit(); //Ctrl + c

    const lower = key.toLowerCase();
    const chipKey = keymap[lower];

    if (chipKey !== undefined) {
      keypad.press(chipKey);
      setTimeout(() => keypad.release(chipKey), 50);
    }
  });
}
