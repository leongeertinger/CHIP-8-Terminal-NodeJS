import { keymap } from './keymap.js';
import { execSync } from 'node:child_process';

export const setupInput = keypad => {

  if (process.stdin.isTTY) {
    try {
      execSync('stty -echo', { stdio: 'inherit' });
    } catch (error) {
      console.error('Error disabling echo:', error);
    }
  }

  //Rawmode for continous stream of keypresses
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  //encoding to convert bytes to strings
  process.stdin.setEncoding("utf8");
  //Listen for data and pass key as argument
  process.on('exit', () => {
    if (process.stdin.isTTY) {
      try {
        execSync('stty echo', { stdio: 'inherit' });
      }
      catch (error) {
        console.error('Error enabling echo:', error);
      }
    }
    //Show marker again
    process.stdin.write('\x1b[?25h');
  })
  process.stdin.on("data", key => {
    if (key === "\u0003") { //Ctrl + c
      process.exit();
    }

    const lower = key.toLowerCase();
    const chipKey = keymap[lower];

    if (chipKey !== undefined) {
      keypad.press(chipKey);
      setTimeout(() => keypad.release(chipKey), 50);
    }
  });
}
