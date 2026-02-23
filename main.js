import { Memory } from './memory.js';
import { Font } from './font.js';
import { Display } from './display.js';
import { Cpu } from './cpu.js';

const ram = new Memory();
const font = new Font(ram.data);
font.load();
const display = new Display();
const cpu = new Cpu(ram.data, display)
