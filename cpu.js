export class Cpu {
  constructor(memory, display, keypad) {
    this.memory = memory;
    this.display = display;
    this.keypad = keypad;

    this.V = new Uint8Array(16);
    this.I = 0;
    this.stack = new Uint16Array(16);
    this.stackPointer = 0;
    this.programCounter = 0x200;

    this.delayTimer = 0;
    this.soundTimer = 0;
  }

  step() {
    //fetch 2 bytes and merge them into one 16bit instruction
    const high = this.memory[this.programCounter];
    const low = this.memory[this.programCounter + 1];
    /*
    add 8 bits of zero padding to the right of high. Then compare
    with low; switch the zero padding with 1s where low has 1s.
    Low will only compare to the zero padding since it has 8 bits
    while high now has 16
    */
    const opcode = (high << 8) | low;
    //Jump to next instruction
    this.programCounter += 2;
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
