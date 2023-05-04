import fs from 'fs';
import readline from 'readline';
import Trie from 'trie-search';
import { INPUT_DICTIONARY_PATH } from '../constants.js';

export const loadDictionaryFile = async (path: string = INPUT_DICTIONARY_PATH): Promise<Trie> => {
    const fileStream = fs.createReadStream(path);
    let trie = new Trie()

    console.log("Reading dictionary from file", path)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    return new Promise<Trie>((resolve) => {
        rl.on('line', (line) => {
            trie.map(line, line);
        });

        rl.on('close', () => {
            fileStream.close();
            console.log("Done reading dictionary")
            resolve(trie);
        });
    });
};
