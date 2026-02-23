export class Cpu {
  constructor(memory, display) {
    this.memory = memory;
    this.display = display;

    this.stack = new Uint16Array(16);
    this.stackPointer = 0;
    this.programCounter = 0x200;
  }
  call(address) {
    this.stack[stackPointer] = this.programCounter;
    this.stackPointer++;
    this.programCounter = address;
  }
  return() {
    this.stackPointer--;
    this.programCounter = this.stack[this.stackPointer];
  }
}
