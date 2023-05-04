import fs from 'fs';
import { Word } from '../index.js';
import { OUTPUT_COMMANDS_PATH } from '../constants.js';

export const writeCommandsToFile = async (words: Word[], path: string = OUTPUT_COMMANDS_PATH): Promise<void> => {
    const fileStream = fs.createWriteStream(path);
    return new Promise<void>((resolve) => {
        words.forEach((word, idx) => {
            fileStream.write(`${word.command}${idx === words.length - 1 ? "" : " && "}`);
        });
        fileStream.close();
        console.log("Wrote all the commands to", path)
        resolve();
    });
};
