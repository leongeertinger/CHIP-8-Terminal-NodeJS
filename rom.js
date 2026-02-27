export class Rom {
  //Common for some games to begin at address 0x200
  constructor(memory, startAddress = 0x200) {
    this.memory = memory;
    this.start = startAddress;
  }

  load(bytes) {
    this.memory.set(bytes, this.start);
  }

}
