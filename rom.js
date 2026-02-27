export class Rom {
  //Common for some games to begin at address 0x200
  constructor(memory, startAddress = 0x200) {
    this.memory = memory;
    this.start = startAddress;

    console.log("Newer version of shift? y/n (Mostly for CHIP-48 and Super-chip games)")
    this.shiftNewer = stdin.read;
  }

  load(bytes) {
    this.memory.set(bytes, this.start);
  }

}
