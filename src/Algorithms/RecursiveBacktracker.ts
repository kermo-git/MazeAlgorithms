import { Position, Maze, MazeAlgorithm, getRandomElement } from "./Maze";

const STACK_COLOR = "#1682f4"
const VISITED_COLOR = "#f5c016"

export class RecursiveBacktracker extends MazeAlgorithm {
    private stack: Position[] = []
    
    private push(pos: Position) {
        this.stack.push(pos)
    }

    private peek(): Position {
        return this.stack[this.stack.length - 1]
    }

    private pop(): Position {
        return this.stack.splice(this.stack.length - 1, 1)[0]
    }

    private visited: Set<string> = new Set()

    visit(pos: Position): void {
        this.visited.add(JSON.stringify(pos))
    }

    isVisited(pos: Position): boolean {
        return this.visited.has(JSON.stringify(pos))
    }
    
    constructor(maze: Maze) {
        super(maze)
        
        const firstPos = getRandomElement(maze.allPositions())
        maze.setColor(firstPos, STACK_COLOR)
        this.push(firstPos)
        this.visit(firstPos)
    }

    override step(): void {
        if (this.stack.length != 0) {
            const current = this.peek()

            let neighbors = this.maze.getNeighbors(current).filter(
                neighbor => !this.isVisited(neighbor)
            )

            if (neighbors.length != 0) {
                const nextNeighbor = getRandomElement(neighbors)

                this.maze.connectCells(current, nextNeighbor)
                this.maze.setColor(nextNeighbor, STACK_COLOR)

                this.visit(nextNeighbor)
                this.push(nextNeighbor)
            } else {
                this.pop()
                this.maze.setColor(current, VISITED_COLOR)
            }
        } else {
            this.finished = true
        }
    }
}
