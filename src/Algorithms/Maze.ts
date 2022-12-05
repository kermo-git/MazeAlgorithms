export interface Cell {
    northOpen: boolean
    westOpen: boolean
    visited: boolean
    color: string
}

export type Maze = Cell[][]

export interface MazeAlgorithm {
    maze: Maze
    /**
     * Runs a single iteration of the algorithm.
     * Return value indicates whether it finised or not.
     */
    step: () => boolean
}

export type Direction = "north" | "east" | "south" | "west"

export interface Position {
    X: number
    Y: number
}

export function initializeMaze(width: number, height: number): Maze {
    let maze: Maze = []
    
    for (let x = 0; x < width; x++) {
        let column: Cell[] = []
        for (let y = 0; y < height; y++) {
            column.push({
                northOpen: false,
                westOpen: false,
                visited: false,
                color: "#FFFFFF"
            })
        }
        maze.push(column)
    }
    return maze
}

export function cellAt(maze: Maze, pos: Position): Cell {
    return maze[pos.X][pos.Y]
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

export function neighborDirections(maze: Maze, pos: Position): Direction[] {
    let result: Direction[] = []
    
    const width = maze.length
    const height = maze[0].length

    if (pos.X > 0) {
        result.push("west")
    }
    if (pos.X < width - 1) {
        result.push("east")
    }
    if (pos.Y > 0) {
        result.push("south")
    }
    if (pos.Y < height - 1) {
        result.push("north")
    }

    return result
}

export function openWall(maze: Maze, location: Position, direction: Direction) {
    switch (direction) {
        case "north":
            cellAt(maze, location).northOpen = true
            return
        case "south":       
            cellAt(maze, move(location, "south")).northOpen = true
            return
        case "west":
            cellAt(maze, location).westOpen = true
            return
        case "east":
            cellAt(maze, move(location, "east")).westOpen = true
            return
    }
}
