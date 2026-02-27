import readline from 'node:readline/promises';
import { Memory } from './memory.js';
import { Font } from './font.js';
import { Rom } from './rom.js';
import { Display } from './display.js';
import { Cpu } from './cpu.js';
import { Keypad } from './keypad.js';
import { setupInput } from './input-node.js';


const ram = new Memory();
const font = new Font(ram.data);
font.load();

const rom = new Rom(ram.data);
rom.load();

const display = new Display();
const keypad = new Keypad();
setupInput(keypad);

const rl = readline.createInterface({ input, output })
const answer = (await rl.question(
  "Use newer cpu behavior (CHIP-48 / SUPER-CHIP)? (y/n)"
)).trim().toLowerCase();
const newerCpu = (answer === 'y');

const cpu = new Cpu(ram.data, display, keypad, newerCpu);

const instructionsPerSecond = 700;
const intervalMs = 1000 / instructionsPerSecond;

setInterval(() => cpu.step(), intervalMs);

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

timerLoop();
