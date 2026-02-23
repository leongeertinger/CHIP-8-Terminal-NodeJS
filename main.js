import { Memory } from './memory.js';
import { Font } from './font.js';

const ram = new Memory();
const font = new Font(ram.data);
font.load();
