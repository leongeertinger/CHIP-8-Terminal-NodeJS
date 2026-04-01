export const renderMenu = (lines) => {
  let output = '';
  output += '\x1b[2J';
  output += '\x1b[0;0H';

  for (const line of lines) {
    output += line + '\n';
  }

  process.stdout.write(output);
};
