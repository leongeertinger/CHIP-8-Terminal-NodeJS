import fs from 'node:fs';
import path from 'node:path';

const settingsPath = path.resolve('./Settings/settings.json');

export const loadSettings = () => {
  try {
    const raw = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(raw);
  } 
  catch (error) {
    console.error("Error loading settings from file", error);
    throw error;
  }
};

export const saveSettings = (settingsData) => {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settingsData, null, 2), 'utf8');
  }
  catch (error){
    console.error("Error writing to settings file.", error);
    throw error;
  }
};
