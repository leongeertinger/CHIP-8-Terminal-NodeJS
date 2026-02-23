export class Memory {
  //Constructing a 4kb array to represent RAM
  constructor(size = 4096) {
    this.data = new Uint8Array(size)
  }
  //no read, write methods. Use built in methods of Uint8Array for speed
};
