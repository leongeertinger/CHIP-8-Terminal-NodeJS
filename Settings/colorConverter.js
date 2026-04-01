import settings from './settings.json' assert { type: 'json' };
const { colors } = settings;

const rgbConverter = hex => {
  if (hex.toString().startsWith('#')) {
    hex = hex.toString();
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  }
  else {
    throw new Error(`Invalid color: ${hex}`);
  }
}

const setAnsiForeground = rgb => {
  return `\x1b[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}

const setAnsiBackground = rgb => {
  return `\x1b[48;2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
}


const rgbColors = Object.values(colors).map(rgbConverter);
