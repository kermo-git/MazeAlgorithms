export function getRandomInt(minInclusive: number, maxExclusive: number) {
    const cmin = Math.ceil(minInclusive)
    const fmax = Math.floor(maxExclusive)
    return Math.floor(Math.random() * (fmax - cmin) + cmin)
}

export function getRandomElement<T>(array: T[]): T {
    return array[getRandomInt(0, array.length)]
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export class CustomSet<T> {
    private data = new Set<string>()

    add(element: T): void {
        this.data.add(JSON.stringify(element))
    }

    has(element: T): boolean {
        return this.data.has(JSON.stringify(element))
    }

    delete(element: T): boolean {
        return this.data.delete(JSON.stringify(element))
    }

    clear(): void {
        this.data.clear()
    }
}

export class CustomMap<K, V> {
    private data = new Map<string, V>()

    set(key: K, value: V): void {
        this.data.set(JSON.stringify(key), value)
    }

    get(key: K): V {
        return this.data.get(JSON.stringify(key))
    }

    has(key: K): boolean {
        return this.data.has(JSON.stringify(key))
    }

    delete(key: K): boolean {
        return this.data.delete(JSON.stringify(key))
    }

    clear(): void {
        this.data.clear()
    }
}
