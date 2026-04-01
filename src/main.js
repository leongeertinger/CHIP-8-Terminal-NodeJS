import { App } from './app.js';

const romPath = process.argv[2];
const app = new App();
app.start(romPath);
