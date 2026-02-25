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
    this.decode(opcode);
  }
  decode(opcode) {
    const nnn = opcode & 0x0FFF; //12 bit adress
    const kk = opcode & 0x00FF; //8 bit
    const n = opcode & 0x000F; //4 bit
    const x = (opcode & 0x0F00) >> 8; //X register index
    const y = (opcode & 0x00F0) >> 4; //Y register index
    switch (opcode & 0xF000) {
      case 0x0000:
        if (opcode === 0x00E0) {
          //00E0: clear screen
          this.display.clear();
          break;
        }
        else if (opcode === 0x00EE) {
          //00EE: return from subroutine
          this.ret();
          break;
        }
        else {
          console.warn(`Unknown opcode 0x${opcode.toString()}`);
        }
      case 0x1000:
        //1NNN: Jump to address NNN
        this.programCounter = nnn;
        break;
      case 0x2000:
        //2NNN: Call address
        this.call(nnn);
        break;
      case 0x6000:
        //6XNN: Set regsiter Vx
        this.V[x] = kk;
        break;
      case 0x7000:
        //7XNN: Add KK to Vx
        this.V[x] += (this.V[x] + kk) & 0xFF;
        break;
      case 0xA000:
        //ANNN: set index I
        this.I = nnn;
        break;
      case 0xD000:
        //DXYN: draw/display
        break;
      default:
        console.warn(`Unknown opcode 0x${opcode.toString()}`);
    }
  }
  call(address) {
    if (this.stackPointer >= this.stack.length) {
      throw new Error('Stack overflow');
    }
    this.stack[this.stackPointer] = this.programCounter;
    this.stackPointer++;
    this.programCounter = address;
  }
  ret() {
    if (this.stackPointer === 0) {
      throw new Error('Stack underflow')
    }
    this.stackPointer--;
    this.programCounter = this.stack[this.stackPointer];
  }
}
