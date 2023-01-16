import { Position, Maze, MazeAlgorithm } from "./Maze";
import { getRandomInt } from "./Utils"

const COLOR = "#f5c016"

class MazeRoom {
    southWest: Position
    northEast: Position

    constructor(sw: Position, ne: Position) {
        this.southWest = sw
        this.northEast = ne
    }

    nRows(): number {
        return this.northEast.Y - this.southWest.Y + 1
    }

    nCols(): number {
        return this.northEast.X - this.southWest.X + 1
    }
}

export class RecursiveDivision extends MazeAlgorithm {
    private rooms: MazeRoom[] = []
    
    constructor(maze: Maze) {
        super(maze)

        maze.allPositions().forEach(pos => {
            if (pos.Y < maze.nRows() - 1) {
                maze.setOpen(pos, "north", true)
            }
            if (pos.X > 0) {
                maze.setOpen(pos, "west", true)
            }
            maze.setColor(pos, COLOR)
        })

        this.rooms.push(new MazeRoom(
            new Position(0, 0),
            new Position(maze.nColumns() - 1, maze.nRows() - 1)
        ))
    }

    private divideHorizontally(room: MazeRoom): void {
        const Y = room.southWest.Y + getRandomInt(0, room.nRows() - 1)
        const openX = room.southWest.X + getRandomInt(0, room.nCols())

        for (let X = room.southWest.X; X <= room.northEast.X; X++) {
            if (X != openX) {
                this.maze.setOpen(new Position(X, Y), "north", false)
            }
        }

        const southRoom = new MazeRoom(
            room.southWest, 
            new Position(room.northEast.X, Y)
        )
        const northRoom = new MazeRoom(
            new Position(room.southWest.X, Y + 1), 
            room.northEast
        )

        if (southRoom.nRows() > 1) {
            this.rooms.push(southRoom)
        }
        if (northRoom.nRows() > 1) {
            this.rooms.push(northRoom)
        }
    }

    private divideVertically(room: MazeRoom): void {
        const X = room.southWest.X + getRandomInt(0, room.nCols() - 1)
        const openY = room.southWest.Y + getRandomInt(0, room.nRows())

        for (let Y = room.southWest.Y ; Y <= room.northEast.Y; Y++) {
            if (Y != openY) {
                this.maze.setOpen(new Position(X, Y), "east", false)
            }
        }

        const westRoom = new MazeRoom(
            room.southWest, 
            new Position(X, room.northEast.Y)
        )
        const eastRoom = new MazeRoom(
            new Position(X + 1, room.southWest.Y), 
            room.northEast
        )

        if (westRoom.nCols() > 1) {
            this.rooms.push(westRoom)
        }
        if (eastRoom.nCols() > 1) {
            this.rooms.push(eastRoom)
        }
    }

    override step(): void {
        if (this.rooms.length > 0) {
            const room = this.rooms.pop()

            if (room.nRows() > room.nCols()) {
                this.divideHorizontally(room)
            } else if (room.nCols() > room.nRows()) {
                this.divideVertically(room)
            } else if (getRandomInt(0, 2) == 1) {
                this.divideHorizontally(room)
            } else {
                this.divideVertically(room)
            }
        } else {
            this.finished = true
        }
    }
}
