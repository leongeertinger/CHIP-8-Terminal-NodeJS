import { Memory } from './memory.js';

export class Rom {
  constructor(memory, startAddress = 0x200) {
    this.memory = memory;
    this.start = startAddress;
  }

  load(bytes) {
    this.memory.set(bytes, this.start);
  }

}
