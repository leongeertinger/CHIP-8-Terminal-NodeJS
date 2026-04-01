export class SettingsMenu {
  constructor(state, settings, updateColorSettings, colorOptions) {
    this.state = state;
    this.settings = settings;
    this.updateColorSettings = updateColorSettings;
    this.colorOptions = colorOptions;
    this.options = ['Foreground color', 'Background color', 'Back'];
    this.hovered = 0;
  }

  moveUp() {
    this.hovered = (this.hovered - 1 + this.options.length) % this.options.length;
  }

  moveDown() {
    this.hovered = (this.hovered + 1) % this.options.length;
  }
  cycleRight() {
    if (this.hovered === 0){
      const next = this.#nextValue(this.colorOptions, this.settings.foreground);
      this.updateColorSettings('foreground', next);
        
    }
    else if (this.hovered === 1){
      const next = this.#nextValue(this.colorOptions, this.settings.background);
      this.updateColorSettings('background', next);
        
    }
    else if (this.hovered === 2){
      this.state.setState('main-menu');
    }
  }
  cycleLeft() {
    if (this.hovered === 0){
      const prev = this.#prevValue(this.colorOptions, this.settings.foreground);
      this.updateColorSettings('foreground', prev);
        
    }
    else if (this.hovered === 1){
      const prev = this.#prevValue(this.colorOptions, this.settings.background);
      this.updateColorSettings('background', prev);
        
    }
    else if (this.hovered === 2){
      this.state.setState('main-menu');
    }

  }
  select() {
    if (this.hovered === 2) {
      this.state.setState('main-menu');
    }
  }

  #nextValue(list, current) {
    const i = list.indexOf(current);
    return list[(i + 1) % list.length] 
  }

  #prevValue(list, current) {
    const i = list.indexOf(current);
    return list[(i - 1 + list.length) % list.length] 
  }

  getLines() {
    const lines = [
      '=== SETTINGS ===',
      '',
      'Use A/D to change values',
      '',
      `${this.hovered === 0 ? '▶' : ' '} Foreground: < ${this.settings.foreground} >`,
      `${this.hovered === 1 ? '▶' : ' '} Background: < ${this.settings.background} >`,
      `${this.hovered === 2 ? '▶' : ' '} Back`
    ];

    return lines;
  }
}
