import { stdin } from 'process';
import readline from 'readline';
import { coordinatesX, coordinatesY } from '../constants.js';
import { Cell } from '../index.js';

export const loadBoardFromCLI = async (): Promise<Cell[][]> => {
    let board: Cell[][] = [];

    console.log("Enter 4 lines made of 4 letters.");
    const rl = readline.createInterface({
        input: stdin,
    });
    const waiter = new Promise<Cell[][]>((resolve) => {
        let lineCounter = 0;
        rl.on('line', (line) => {
            const lineArray: Cell[] = line.split("").map(
                (letter, idx) => ({ letter, position: { x: coordinatesX[idx], y: coordinatesY[lineCounter] } }));
            board = [...board, lineArray];
            lineCounter += 1;
            if (lineCounter === 4) {
                rl.close();
            }
        });

        rl.on('close', () => {
            console.log('Finished reading board');
            resolve(board);
        });
    });

    return waiter;
};
