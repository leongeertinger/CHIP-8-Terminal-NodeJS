export class Memory {
  constructor(size = 4096) {
    this.data = new Uint8Array(size)
  }
};
