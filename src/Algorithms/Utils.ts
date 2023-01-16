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

export class UnionFind<T> {

    private parents = new CustomMap<T, T>()
    private sizes = new CustomMap<T, number>()

    constructor(elements: T[]) {
        elements.forEach(e => {
            this.parents.set(e, e)
            this.sizes.set(e, 1)
        })
    }

    find(element: T): T {
        while (true) {
            const parent = this.parents.get(element)
            if (this.equal(element, parent)) {
                return parent
            }
            element = parent
        }
    }

    union(element1: T, element2: T): void {
        const parent1 = this.find(element1)
        const parent2 = this.find(element2)

        if (this.equal(parent1, parent2)) {
            return
        }

        const size1 = this.sizes.get(parent1)
        const size2 = this.sizes.get(parent2)

        const [smaller, larger] = (size1 < size2) ? [parent1, parent2] : [parent2, parent1]

        this.parents.set(smaller, larger)
        this.sizes.set(larger, size1 + size2)
    }

    connected(element1: T, element2: T): boolean {
        const parent1 = this.find(element1)
        const parent2 = this.find(element2)

        return this.equal(parent1, parent2)
    }

    private equal(e1: T, e2: T): boolean {
        return JSON.stringify(e1) == JSON.stringify(e2)
    }
}
