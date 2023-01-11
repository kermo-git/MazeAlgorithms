import { Maze, MazeAlgorithm, Position, shuffle, Edge } from "./Maze";

export class Kruskal extends MazeAlgorithm {

    private parents: Map<string, Position> = new Map()

    private edges: Edge[]

    constructor(maze: Maze) {
        super(maze)
        this.edges = maze.allEdges()
        shuffle(this.edges)
        maze.allPositions().forEach(p => {
            this.setParent(p, p)
        })
    }

    private setParent(p: Position, parent: Position): void {
        this.parents.set(JSON.stringify(p), parent)
    }

    private getParent(p: Position): Position {
        return this.parents.get(JSON.stringify(p))
    }

    private findParent(p: Position): Position {
        while (true) {
            const parent = this.getParent(p)
            if (p.equals(parent)) {
                return parent
            }
            p = parent
        }
    }

    private union(p1: Position, p2: Position): void {
        const parent1 = this.findParent(p1)
        const parent2 = this.findParent(p2)

        if (parent1.equals(parent2)) {
            return
        }

        this.setParent(parent1, parent2)
    }

    override step(): void {
        const edge = this.edges.pop()

        if (edge !== undefined) {
            const [p1, p2] = edge
            this.maze.setColor(p1, "pink")
            this.maze.setColor(p2, "pink")
            const parent1 = this.findParent(p1)
            const parent2 = this.findParent(p2)

            if (!parent1.equals(parent2)) {
                this.maze.connectCells(p1, p2)
                this.union(p1, p2)
            }
        } else {
            this.finished = true
        }
    }
}
