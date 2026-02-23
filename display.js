export class Display {
  //Using 1D array instead of 2D array for easier iteration
  constructor(width = 64, height = 32) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint8Array(width * height);
  }
  clear() {
    this.pixels.fill(0);
  }
  //Private method to index the array like it was a 2d array
  #index(x, y) {
    return x + y * this.width;
  }
  //Returns 0 or 1 if a pixel is "lit" or not for future debugging
  getPixel(x, y) {
    return this.pixels[this.#index(x, y)];
  }
  //Sets pixels depending on if value is truthy or not
  setPixel(x, y, value) {
    this.pixels[this.#index(x, y)] = value ? 1 : 0;
  }
  //IDK why we xor the pixels yet... either collision or having empty pixels?
  // 0 : 0 => 0
  // 0 : 1 => 1
  // 1 : 0 => 1
  // 1 : 1 => 0
  xorPixel(x, y, value) {
    const index = this.#index(x, y);
    const oldValue = this.pixels[index];
    const newValue = oldValue ^ value;
    this.pixels[index] = newValue;
    return oldValue === 1 && newValue === 0 ? 1 : 0;
  }
}
