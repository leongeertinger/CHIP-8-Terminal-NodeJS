import { Memory } from './memory.js';
import { Font } from './font.js';
import { Display } from './display.js';
import { Cpu } from './cpu.js';

const ram = new Memory();
const font = new Font(ram.data);
font.load();
const display = new Display();
const cpu = new Cpu(ram.data, display)

const playBeep = () => {
  process.stdout.write('\x07'); //terminal beep
}

const cpuLoop = () => {
  cpu.step();
  setImmediate(cpuLoop);
}

const timerLoop = () => {
  if (cpu.delayTimer > 0) cpu.delayTimer--;
  if (cpu.soundTimer > 0) {
    cpu.soundTimer--;
    playBeep();
  }
  setTimeout(timerLoop, 1000 / 60);
}

cpuLoop();
timerLoop();
