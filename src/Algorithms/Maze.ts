interface Cell {
    northOpen: boolean
    westOpen: boolean
    visited: boolean
    color: string
}

export type Direction = "north" | "east" | "south" | "west"

export interface Position {
    X: number
    Y: number
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
                    visited: false,
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

    neighborDirections({X, Y}: Position): Direction[] {
        let result: Direction[] = []
    
        if (X > 0) {
            result.push("west")
        }
        if (X < this.nColumns() - 1) {
            result.push("east")
        }
        if (Y > 0) {
            result.push("south")
        }
        if (Y < this.nRows() - 1) {
            result.push("north")
        }
    
        return result
    }

    private get({X, Y}: Position): Cell {
        return this.cells[X][Y]
    }

    openWall(location: Position, direction: Direction): void {
        switch (direction) {
            case "north":
                this.get(location).northOpen = true
                return
            case "south":       
                this.get(move(location, "south")).northOpen = true
                return
            case "west":
                this.get(location).westOpen = true
                return
            case "east":
                this.get(move(location, "east")).westOpen = true
                return
        }
    }

    isOpen(location: Position, direction: Direction): boolean {
        switch (direction) {
            case "north":
                return this.get(location).northOpen
            case "south":       
                return this.get(move(location, "south")).northOpen
            case "west":
                return this.get(location).westOpen
            case "east":
                return this.get(move(location, "east")).westOpen
        }
    }

    setColor(location: Position, color: string): void {
        this.get(location).color = color
    }

    getColor(location: Position): string {
        return this.get(location).color
    }
}

export interface MazeAlgorithm {
    maze: Maze
    /**
     * Runs a single iteration of the algorithm.
     * Return value indicates whether it finised or not.
     */
    step: () => boolean
}

export function move(pos: Position, direction: Direction): Position {
    switch (direction) {
        case "north":
            return {X: pos.X, Y: pos.Y + 1}
        case "south":       
            return {X: pos.X, Y: pos.Y - 1}
        case "west":
            return {X: pos.X - 1, Y: pos.Y}
        case "east":
            return {X: pos.X + 1, Y: pos.Y}
    }
}
