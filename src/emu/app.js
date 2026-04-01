import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs';
import { Memory } from './memory.js';
import { Font } from './font.js';
import { Rom } from './rom.js';
import { Display } from './display.js';
import { render } from '../services/render.js';
import { Cpu } from './cpu.js';
import { Keypad } from './keypad.js';
import { setupInput } from '../services/input-node.js';
import { StateManager } from '../services/stateManager.js';
import { InputMenu } from '../ui/input-menu.js';
import { SettingsMenu } from '../ui/settings-menu.js';
import { RomMenu } from '../ui/rom-menu.js';
import { MainMenu } from '../ui/main-menu.js';

export class App {
  constructor() {
    this.state = new StateManager('main-menu');

    this.ram = new Memory();
    this.font = new Font(this.ram.data);
    this.font.load();

    this.display = new Display();
    this.keypad = new Keypad();
    setupInput(this.keypad, this.state);

    this.cpu = new Cpu(this.ram.data, this.display, this.font, this.keypad);

    this.rom = new Rom(this.ram.data);
    
    this.inputMenu = new InputMenu();
    this.settingsMenu = new SettingsMenu(this.inputMenu, this.state, this.keypad);
    this.romMenu = new RomMenu(this.inputMenu, this.state, this.keypad);
    this.mainMenu = new MainMenu(this.inputMenu, this.state, this.keypad, this.rom);

    this.keypad.onKey = (chipKey) => this.cpu.onKeyPress(chipKey);

    this.instructionsPerSecond = 700;
    this.intervalMs = 1000 / this.instructionsPerSecond;
  }



  playBeep = () => {
    process.stdout.write('\x07'); //terminal beep
  }


  //60hz
  timerLoop = () => {
    if (this.state.is('exit')) return;

    if (this.cpu.delayTimer > 0) this.cpu.delayTimer--;
    if (this.cpu.soundTimer > 0) {
      this.cpu.soundTimer--;
      this.playBeep();
    }
    setTimeout(this.timerLoop, 1000 / 60);
  }
  renderLoop = () => {
    if (this.state.is('exit')) return;

    if (this.state.is('running')) {
      render(this.display);
    } 
    else if (this.state.is('main-menu')) {
      this.mainMenu.render();
    } 
    else if (this.state.is('rom-menu')) {
      this.romMenu.render();
    } 
    else if (this.state.is('settings-menu')) {
      this.settingsMenu.render();
    }
    //60 fps
    setTimeout(this.renderLoop, 1000 / 60);
  }

  //Start the timers and rendering
  start = romPath => {
    if (this.state.is('main-menu')){

    }
    if (romPath) {
      const romBytes = fs.readFileSync(romPath);
      this.rom.load(romBytes);
      this.state.setState('running');
    }


    this.cpuInterval = setInterval(() => {
      if (this.state.is('running')) this.cpu.step();
    }, this.intervalMs);

    this.timerLoop();
    this.renderLoop();
  };

  //Stop the cpu steps
  stop = () => {
    this.state.setState('exit');
    if (this.cpuInterval) clearInterval(this.cpuInterval);
  }
}
