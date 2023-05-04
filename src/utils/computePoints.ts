import { letterPoints } from '../constants.js';

export const computePoints = (word: string): number => {
    return Array.from(word).reduce((sumOfPoints: number, letter: string) => sumOfPoints + letterPoints[letter as keyof typeof letterPoints], 0);
};
