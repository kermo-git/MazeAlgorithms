export const EMPTY_POSITION_COLOR = "rgba(255, 255, 255, 0.8)"

export type Direction = "north" | "east" | "south" | "west"

export class Position {
    X: number
    Y: number

    constructor(X: number, Y: number) {
        this.X = X
        this.Y = Y
    }

    move(direction: Direction): Position {
        switch (direction) {
            case "north":
                return new Position(this.X, this.Y + 1)
            case "south":       
                return new Position(this.X, this.Y - 1)
            case "west":
                return new Position(this.X - 1, this.Y)
            case "east":
                return new Position(this.X + 1, this.Y)
        }
    }

    equals(other: Position): boolean {
        return this.X == other.X && this.Y == other.Y
    }
}

export type Edge = [Position, Position];

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
                    color: EMPTY_POSITION_COLOR
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

    getNeighborDirections(pos: Position): Direction[] {
        const result: Direction[] = []
    
        if (pos.X > 0) {
            result.push("west")
        }
        if (pos.X < this.nColumns() - 1) {
            result.push("east")
        }
        if (pos.Y > 0) {
            result.push("south")
        }
        if (pos.Y < this.nRows() - 1) {
            result.push("north")
        }
    
        return result
    }

    getNeighbors(pos: Position): Position[] {
        const directions = this.getNeighborDirections(pos)
        return directions.map(direction => pos.move(direction))
    }

    private get({X, Y}: Position): Cell {
        return this.cells[X][Y]
    }

    connectCells(cell1: Position, cell2: Position): void {
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

    setOpen(location: Position, direction: Direction, isOpen: boolean): void {
        switch (direction) {
            case "north":
                this.get(location).northOpen = isOpen
                return
            case "south":       
                this.get(location.move("south")).northOpen = isOpen
                return
            case "west":
                this.get(location).westOpen = isOpen
                return
            case "east":
                this.get(location.move("east")).westOpen = isOpen
                return
        }
    }

    isOpen(location: Position, direction: Direction): boolean {
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

    setColor(location: Position, color: string): void {
        this.get(location).color = color
    }

    getColor(location: Position): string {
        return this.get(location).color
    }

    allPositions(): Position[] {
        const cols = this.nColumns()
        const rows = this.nRows()
        const result: Position[] = []
    
        for (let X = 0; X < cols; X++) {
            for (let Y = 0; Y < rows; Y++) {
                result.push(new Position(X, Y))
            }
        }
        return result
    }

    allEdges(): Edge[] {
        return this.allPositions().flatMap(p =>
            this.getNeighborDirections(p)
                .filter(d => d == "north" || d == "west")
                .map(d => [p, p.move(d)] as Edge)
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
