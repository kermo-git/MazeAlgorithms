import { Maze, MazeAlgorithm, Position, Edge } from "./Maze";
import { CustomMap, shuffle } from "./Utils"

const SELECTED_COLOR = "#1682f4"
const VISITED_COLOR = "#f5c016"

export class Kruskal extends MazeAlgorithm {

    private parents = new CustomMap<Position, Position>()

    private edges: Edge[]

    private stepCount: number = 0

    private currentEdge: Edge | undefined

    constructor(maze: Maze) {
        super(maze)
        this.edges = maze.allEdges()
        shuffle(this.edges)
        maze.allPositions().forEach(p => {
            this.parents.set(p, p)
        })
    }

    private findParent(p: Position): Position {
        while (true) {
            const parent = this.parents.get(p)
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

        this.parents.set(parent1, parent2)
    }

    override step(): void {
        if (this.stepCount % 2 == 0) {
            this.currentEdge = this.edges.pop()

            if (this.currentEdge !== undefined) {
                const [p1, p2] = this.currentEdge
                this.maze.setColor(p1, SELECTED_COLOR)
                this.maze.setColor(p2, SELECTED_COLOR)
            } else {
                this.finished = true
            }

        } else {
            const [p1, p2] = this.currentEdge
            const parent1 = this.findParent(p1)
            const parent2 = this.findParent(p2)

            if (!parent1.equals(parent2)) {
                this.maze.connectCells(p1, p2)
                this.union(p1, p2)
            }
            this.maze.setColor(p1, VISITED_COLOR)
            this.maze.setColor(p2, VISITED_COLOR)
        }
        this.stepCount++
    }
}
