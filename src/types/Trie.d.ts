declare module 'trie-search' {
    export default class TrieSearch {
        add(item: string): void
        addAll(items: string[]): void
        reset(): void
        addFromObject(obj: any, valueField?: string): void
        map(key: string, value: string): void
        get(phraseOrPhrases: string | string[]): string[]
        search(phrases: string | string[]): string[]
    }
}

