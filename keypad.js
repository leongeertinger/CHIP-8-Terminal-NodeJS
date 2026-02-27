export class Keypad {
  constructor() {
    this.keys = new Array(16).fill(false);
    this.onKey = null;
  }
  press(key) {
    this.keys[key] = true;
    if (this.onKey) this.onKey(key);
  }
  release(key) {
    this.keys[key] = false;
  }
  isPressed(key) {
    return this.keys[key];
  }
}
