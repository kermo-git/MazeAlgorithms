import { P as Pos, Maze, MazeAlgorithm, getRandomElement } from "./Maze";

export class RecursiveBactracker extends MazeAlgorithm {
    private stack: Pos[] = []
    
    private push(pos: Pos) {
        this.stack.push(pos)
    }

    private peek(): Pos {
        return this.stack[this.stack.length - 1]
    }

    private pop(): Pos {
        return this.stack.splice(this.stack.length - 1, 1)[0]
    }

    private visited: Set<string> = new Set()

    visit(pos: Pos): void {
        this.visited.add(JSON.stringify(pos))
    }

    isVisited(pos: Pos): boolean {
        return this.visited.has(JSON.stringify(pos))
    }
    
    constructor(maze: Maze) {
        super(maze)
        
        const firstPos = getRandomElement(maze.allPositions())
        maze.setColor(firstPos, "purple")
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
                this.maze.setColor(nextNeighbor, "purple")

                this.visit(nextNeighbor)
                this.push(nextNeighbor)
            } else {
                this.pop()
                this.maze.setColor(current, "pink")
            }
        } else {
            this.finished = true
        }
    }
}
