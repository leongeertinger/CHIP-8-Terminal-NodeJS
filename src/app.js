import fs from 'node:fs';
import path from 'node:path';
import { Memory } from './emu/memory.js';
import { Font } from './emu/font.js';
import { Rom } from './emu/rom.js';
import { Display } from './emu/display.js';
import { render as renderDisplay } from './services/render.js';
import { renderMenu } from './services/menu-render.js';
import { Cpu } from './emu/cpu.js';
import { Keypad } from './emu/keypad.js';
import { setupInput } from './services/input.js';
import { StateManager } from './services/stateManager.js';
import { SettingsMenu } from './ui/settings-menu.js';
import { RomMenu } from './ui/rom-menu.js';
import { MainMenu } from './ui/main-menu.js';
import { keymap } from './emu/keymap.js';

export class App {
  constructor() {
    this.state = new StateManager('main-menu');

    this.ram = new Memory();
    this.font = new Font(this.ram.data);
    this.font.load();

    this.display = new Display();
    this.keypad = new Keypad();

    this.cpu = new Cpu(this.ram.data, this.display, this.font, this.keypad);

    this.rom = new Rom(this.ram.data);
    
    this.settingsMenu = new SettingsMenu(this.state);
    this.romMenu = new RomMenu(this.state);
    this.mainMenu = new MainMenu(this.state);

    this.keypad.onKey = (chipKey) => this.cpu.onKeyPress(chipKey);

    setupInput((key) => this.handleKey(key));

    this.instructionsPerSecond = 700;
    this.intervalMs = 1000 / this.instructionsPerSecond;
  }

  loadRomByName = (name) => {
    const romMap = {
      Breakout: 'ROM/Breakout [Carmelo Cortez, 1979].ch8',
      Pong: 'ROM/Pong (alt).ch8',
      Tetris: 'ROM/Tetris [Fran Dachille, 1991].ch8',
    };

    const romPath = romMap[name];
    if (!romPath) return;

    const romBytes = fs.readFileSync(romPath);

    this.rom.load(romBytes);
    this.state.setState('running');
  };

  handleKey = (rawKey) => {
    const key = rawKey.toLowerCase();

    if (this.state.is('running')) {
      if (rawKey === '\u001b') {
        this.state.setState('main-menu');
        return;
      }

      const chipKey = keymap[key];
      if (chipKey !== undefined) {
        this.keypad.press(chipKey);
        setTimeout(() => this.keypad.release(chipKey), 50);
      }
      return;
    }

    if (this.state.is('main-menu')) {
      if (key === 'w') this.mainMenu.moveUp();
      if (key === 's') this.mainMenu.moveDown();
      if (key === 'd' || rawKey === '\r') this.mainMenu.select();
      return;
    }

    if (this.state.is('rom-menu')) {
      if (key === 'w') this.romMenu.moveUp();
      if (key === 's') this.romMenu.moveDown();

      if (rawKey === '\u001b') {
        this.state.setState('main-menu');
        return;
      }

      if (key === 'd' || rawKey === '\r') {
        const selected = this.romMenu.select();
        if (selected && selected !== 'back') {
          this.loadRomByName(selected);
        }
      }
      return;
    }

    if (this.state.is('settings-menu')) {
      if (key === 'w') this.settingsMenu.moveUp();
      if (key === 's') this.settingsMenu.moveDown();

      if (rawKey === '\u001b') {
        this.state.setState('main-menu');
        return;
      }

      if (key === 'd' || rawKey === '\r') {
        this.settingsMenu.select();
      }
    }
  };

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
      renderDisplay(this.display);
    } 
    else if (this.state.is('main-menu')) {
      renderMenu(this.mainMenu.getLines());
    } 
    else if (this.state.is('rom-menu')) {
      renderMenu(this.romMenu.getLines());
    } 
    else if (this.state.is('settings-menu')) {
      renderMenu(this.settingsMenu.getLines());
    }
    //60 fps
    setTimeout(this.renderLoop, 1000 / 60);
  }

  //Start the timers and rendering
  start = romPath => {

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
