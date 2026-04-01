export class MainMenu {
  constructor(state) {
    this.state = state;
    this.options = ['ROMs', 'Settings'];
    this.hovered = 0;
  }

  moveUp() {
    this.hovered = (this.hovered - 1 + this.options.length) % this.options.length;
  }

  moveDown() {
    this.hovered = (this.hovered + 1) % this.options.length;
  }
  
  select() {
    //Use switch to be able to add more options in future
    switch (this.hovered) {
      case 0:
        this.state.setState('rom-menu');
        break;
      case 1:
        this.state.setState('settings-menu');
        break;
    }
  }

  getLines() {
    const lines = [
      '╔══════════════════════════════════════╗',
      '║              CHIP-8                  ║',
      '║          Terminal Emulator           ║',
      '╚══════════════════════════════════════╝',
      '',
      'Use W/S to move',
      'Use D or Enter to select',
      'Press Esc to go back',
      'Press Ctrl+C to Quit',
      '',
    ];

    for (let i = 0; i < this.options.length; i++) {
      const prefix = i === this.hovered ? '▶ ' : '  ';
      lines.push(`${prefix}${this.options[i]}`);
    }

    lines.push('');
    lines.push(`
      Controls in-game: 
      / 1 2 3 4 / 
      / Q W E R / 
      / A S D F / 
      / Z X C V /`);

    return lines;
  }
}
