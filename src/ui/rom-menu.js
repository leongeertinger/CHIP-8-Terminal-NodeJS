export class RomMenu {
  constructor(state) {
    this.state = state;
    this.options = [
      'Breakout',
      'Pong',
      'Tetris',
      'Back'
    ];
    this.hovered = 0;
  }

  moveUp() {
    this.hovered = (this.hovered - 1 + this.options.length) % this.options.length;
  }

  moveDown() {
    this.hovered = (this.hovered + 1) % this.options.length;
  }

  select() {
    if (this.hovered === this.options.length - 1) {
      this.state.setState('main-menu');
      return 'back';
    }

    return this.options[this.hovered];
  }

  getLines() {
    const lines = [
      '=== ROM MENU ===',
      '',
      'Choose a ROM:',
      ''
    ];

    for (let i = 0; i < this.options.length; i++) {
      const prefix = i === this.hovered ? '▶ ' : '  ';
      lines.push(`${prefix}${this.options[i]}`);
    }

    return lines;
  }
}
