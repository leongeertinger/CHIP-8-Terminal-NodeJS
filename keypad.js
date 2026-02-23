export class Keypad {
  constructor() {
    this.keys = new Array(16).fill(false);
  }
  press(key) {
    this.keys[key] = true;
  }
  release(key) {
    this.keys[key] = false;
  }
  isPressed(key) {
    return this.keys[key];
  }
}
