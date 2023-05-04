import { writeCommandsToFile } from './utils/writeCommandsToFile.js'
import { computePoints } from './utils/computePoints.js'
import { loadDictionaryFile } from './utils/loadFile.js'
import { loadBoardFromCLI } from './utils/loadBoardFromCLI.js'

export type Cell = { letter: string, position: Record<"x" | "y", number> }
export type Word = { word: string, command: string, points: number }
type Dictionary = Record<string, Word>

const trie = await loadDictionaryFile()
const board = await loadBoardFromCLI()
/*
const board = [[{ "letter": "e", "position": { "x": 170, "y": 890 } }, { "letter": "b", "position": { "x": 422, "y": 890 } }, { "letter": "e", "position": { "x": 666, "y": 890 } }, { "letter": "r", "position": { "x": 900, "y": 890 } }], [{ "letter": "a", "position": { "x": 170, "y": 1135 } }, { "letter": "r", "position": { "x": 422, "y": 1135 } }, { "letter": "g", "position": { "x": 666, "y": 1135 } }, { "letter": "n", "position": { "x": 900, "y": 1135 } }], [{ "letter": "a", "position": { "x": 170, "y": 1398 } }, { "letter": "e", "position": { "x": 422, "y": 1398 } }, { "letter": "a", "position": { "x": 666, "y": 1398 } }, { "letter": "i", "position": { "x": 900, "y": 1398 } }], [{ "letter": "o", "position": { "x": 170, "y": 1645 } }, { "letter": "r", "position": { "x": 422, "y": 1645 } }, { "letter": "e", "position": { "x": 666, "y": 1645 } }, { "letter": "l", "position": { "x": 900, "y": 1645 } }]]
TODO 
 check how hard it is to turn the recursive function into iterative (traverse) 
*/

let foundWords: Dictionary = {}

const traverse = (i: number, j: number, visited: string[], prevSubstring: string, command: string) => {
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            if (k >= 0 && k < board.length && l >= 0 && l < board[i].length) {
                if (visited.includes(`${k},${l}`)) {
                    continue
                }
                const currentSubstring = `${prevSubstring}${board[k][l].letter}`
                const words: string[] = trie.search(currentSubstring)
                if (words.length > 0) {
                    const found = words.find(w => w === currentSubstring)
                    if (!!found) {
                        foundWords = {
                            ...foundWords,
                            [currentSubstring]: {
                                word: currentSubstring,
                                command: `adb shell "${command} && input motionevent UP ${board[k][l].position.x} ${board[k][l].position.y}"`,
                                points: computePoints(currentSubstring)
                            }
                        }
                    }
                    traverse(k, l, [...visited, `${k},${l}`], `${prevSubstring}${board[k][l].letter}`, `${command} && input motionevent MOVE ${board[k][l].position.x} ${board[k][l].position.y}`)
                }
            }
        }
    }
}
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        traverse(i, j, [`${i},${j}`], board[i][j].letter, `input motionevent DOWN ${board[i][j].position.x} ${board[i][j].position.y}`)
    }
}


const sortedWords = Object.values(foundWords).sort((a, b) => b.points - a.points)
writeCommandsToFile(sortedWords)