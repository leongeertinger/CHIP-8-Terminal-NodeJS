import { Memory } from './memory.js';
import { Font } from './font.js';
import { Display } from './display.js';

const ram = new Memory();
const font = new Font(ram.data);
font.load();
