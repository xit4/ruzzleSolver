export const INPUT_DICTIONARY_PATH = "assets/dictionary_ita.txt"
export const OUTPUT_COMMANDS_PATH = "build/commands.sh"

// these letter points work for italian
export const letterPoints = {
    a: 1, e: 1, i: 1, o: 1, c: 2, r: 2, s: 2, t: 2, l: 3, m: 3, n: 3, u: 3, y: 4, b: 5, d: 5, f: 5, k: 5, p: 5, v: 5, g: 8, h: 8, z: 8, j: 10, q: 10, w: 10, x: 10,
} as const;

// coordinates extracted manually, they work for my phone
export const coordinatesX = [170, 422, 666, 900]
export const coordinatesY = [890, 1135, 1398, 1645]