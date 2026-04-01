import settings from './settings.json' assert { type: 'json' };
const { colors } = settings;

const rgbConverter = hex => {
  if (hex.toString().startsWith('#') && hex.toString().length === 7) {
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

export const ansiForeground = hex => {
  const [r, g, b] = rgbConverter(hex);
  return `\x1b[38;2;${r};${g};${b}m`;
}

export const ansiBackground = hex => {
  const [r, g, b] = rgbConverter(hex);
  return `\x1b[48;2;${r};${g};${b}m`;
}
