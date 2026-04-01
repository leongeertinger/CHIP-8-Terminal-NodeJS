import { render } from './menu-render.js';

export class MainMenu {
  constructor(input, state, keypad, rom) {
    this.options = ['Start', 'ROM', 'Settings', 'Quit'];
    this.hovered = 0;
    this.input = input;
    this.state = state;
    this.keypad = keypad;
    this.rom = rom;
    this.render = menu-render;
  }

  this.render(this.options);

  select(hovered){
    switch (hovered){
      case 0:
        this.state.setState('running');
        break;
      case 1:
        this.render(romOptions); //Fix: Add rom options
        this.rom.load(selectedRom); //Fix: Add selectedRom
        break;
      case 2:
        this.render(settingsOptions); //Fix: Add settingsOptions
        break;
      case 3:
        this.state.setState('exit');
        break;
    }
    
  }
  if this.state.is('main-menu'){
    if (this.keypad.keys[0x5]){
      this.input.moveUp(this.options, this.hovered);
    }
    if (this.keypad.keys[0x8]){
      this.input.moveDown(this.options, this.hovered);
    }
    if (this.keypad.keys[0x6]){
      this.select(this.hovered);
    }
  }
  
}
