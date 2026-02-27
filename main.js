import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import { Memory } from './memory.js';
import { Font } from './font.js';
import { Rom } from './rom.js';
import { Display } from './display.js';
import { render } from './render.js';
import { Cpu } from './cpu.js';
import { Keypad } from './keypad.js';
import { setupInput } from './input-node.js';

// 1. Create Ram and font
const ram = new Memory();
const font = new Font(ram.data);
font.load();

// 2. Load ROM from file
const romPath = process.argv[2];
if (!romPath) {
  console.error("Usage: node main.js ./ROM/<rom-file>")
  process.exit(1);
}
const romBytes = fs.readFileSync(romPath);
const rom = new Rom(ram.data);
rom.load(romBytes);

// 3. Create display + keypad + handle input
const display = new Display();
const keypad = new Keypad();
setupInput(keypad);

// 4. Prompt to use for the shift behavior in decode function
const rl = readline.createInterface({ input, output })
const answer = (await rl.question(
  "Use newer cpu behavior (CHIP-48 / SUPER-CHIP)? (y/n)"
)).trim().toLowerCase();
rl.close();
const newerCpu = (answer === 'y');
// 5. Create the CPU instance
const cpu = new Cpu(ram.data, display, font, keypad, newerCpu);

// Used for FX0A opcode to halt the CPU step() function
keypad.onKey = (chipKey) => cpu.onKeyPress(chipKey);


const playBeep = () => {
  process.stdout.write('\x07'); //terminal beep
}


//60hz
const timerLoop = () => {
  if (cpu.delayTimer > 0) cpu.delayTimer--;
  if (cpu.soundTimer > 0) {
    cpu.soundTimer--;
    playBeep();
  }
  setTimeout(timerLoop, 1000 / 60);
}
const renderLoop = () => {
  render(display);
  //60 fps
  setTimeout(renderLoop, 1000 / 60);
}

const instructionsPerSecond = 700;
const intervalMs = 1000 / instructionsPerSecond;

//Start the timers and rendering
setInterval(() => cpu.step(), intervalMs);
timerLoop();
renderLoop();
