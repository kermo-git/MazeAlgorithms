export type Direction = "north" | "east" | "south" | "west"

export class P {
    X: number
    Y: number

    constructor(X: number, Y: number) {
        this.X = X
        this.Y = Y
    }

    move(direction: Direction): P {
        switch (direction) {
            case "north":
                return new P(this.X, this.Y + 1)
            case "south":       
                return new P(this.X, this.Y - 1)
            case "west":
                return new P(this.X - 1, this.Y)
            case "east":
                return new P(this.X + 1, this.Y)
        }
    }

    equals(other: P): boolean {
        return this.X == other.X && this.Y == other.Y
    }
}

export type Edge = [P, P];

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

interface Cell {
    northOpen: boolean
    westOpen: boolean
    color: string
}

export class Maze {
    private cells: Cell[][]

    constructor(cols: number, rows: number) {
        this.cells = []
    
        for (let x = 0; x < cols; x++) {
            let column: Cell[] = []
            for (let y = 0; y < rows; y++) {
                column.push({
                    northOpen: false,
                    westOpen: false,
                    color: "#FFFFFF"
                })
            }
            this.cells.push(column)
        }
    }

    nColumns(): number {
        return this.cells.length
    }

    nRows(): number {
        return this.cells[0].length
    }

    getNeighbors(pos: P): P[] {
        let result: P[] = []
    
        if (pos.X > 0) {
            result.push(pos.move("west"))
        }
        if (pos.X < this.nColumns() - 1) {
            result.push(pos.move("east"))
        }
        if (pos.Y > 0) {
            result.push(pos.move("south"))
        }
        if (pos.Y < this.nRows() - 1) {
            result.push(pos.move("north"))
        }
    
        return result
    }

    private get({X, Y}: P): Cell {
        return this.cells[X][Y]
    }

    connectCells(cell1: P, cell2: P): void {
        if (cell1.Y < cell2.Y) {
            this.get(cell1).northOpen = true
        }
        else if (cell1.Y > cell2.Y) {
            this.get(cell2).northOpen = true
        }
        else if (cell1.X < cell2.X) {
            this.get(cell2).westOpen = true
        }
        else if (cell1.X > cell2.X) {
            this.get(cell1).westOpen = true
        }
    }

    openDirection(location: P, direction: Direction): void {
        switch (direction) {
            case "north":
                this.get(location).northOpen = true
                return
            case "south":       
                this.get(location.move("south")).northOpen = true
                return
            case "west":
                this.get(location).westOpen = true
                return
            case "east":
                this.get(location.move("east")).westOpen = true
                return
        }
    }

    isOpen(location: P, direction: Direction): boolean {
        switch (direction) {
            case "north":
                return this.get(location).northOpen
            case "south":       
                return this.get(location.move("south")).northOpen
            case "west":
                return this.get(location).westOpen
            case "east":
                return this.get(location.move("east")).westOpen
        }
    }

    setColor(location: P, color: string): void {
        this.get(location).color = color
    }

    getColor(location: P): string {
        return this.get(location).color
    }

    allPositions(): P[] {
        const cols = this.nColumns()
        const rows = this.nRows()
        const result: P[] = []
    
        for (let X = 0; X < cols; X++) {
            for (let Y = 0; Y < rows; Y++) {
                result.push(new P(X, Y))
            }
        }
        return result
    }

    allEdges(): Edge[] {
        return this.allPositions().flatMap(p =>
            this.getNeighbors(p).map(n => [p, n] as Edge)
        )
    }
}

export abstract class MazeAlgorithm {
    maze: Maze
    protected finished = false
    
    constructor(maze: Maze) {
        this.maze = maze
    }

    isFinished(): boolean {
        return this.finished
    }

    /**
     * Runs a single iteration of the algorithm.
     */
    abstract step(): void
}
