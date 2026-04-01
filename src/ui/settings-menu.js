export class SettingsMenu {
  constructor(state) {
    this.state = state;
    this.options = ['Coming soon', 'Back'];
    this.hovered = 0;
  }

  moveUp() {
    this.hovered = (this.hovered - 1 + this.options.length) % this.options.length;
  }

  moveDown() {
    this.hovered = (this.hovered + 1) % this.options.length;
  }

  select() {
    if (this.hovered === 1) {
      this.state.setState('main-menu');
    }
  }

  getLines() {
    const lines = [
      '=== SETTINGS ===',
      '',
      'Settings menu is not implemented yet.',
      ''
    ];

    for (let i = 0; i < this.options.length; i++) {
      const prefix = i === this.hovered ? '▶ ' : '  ';
      lines.push(`${prefix}${this.options[i]}`);
    }

    return lines;
  }
}
