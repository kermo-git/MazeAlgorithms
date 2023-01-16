import { Maze, MazeAlgorithm, Position, Edge } from "./Maze";
import { CustomMap, shuffle, UnionFind } from "./Utils"

const SELECTED_COLOR = "#1682f4"
const VISITED_COLOR = "#f5c016"

export class Kruskal extends MazeAlgorithm {

    private unionFind: UnionFind<Position>

    private edges: Edge[]

    private stepCount: number = 0

    private currentEdge: Edge | undefined

    constructor(maze: Maze) {
        super(maze)
        this.edges = maze.allEdges()
        shuffle(this.edges)
        this.unionFind = new UnionFind(maze.allPositions())
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

            if (!this.unionFind.connected(p1, p2)) {
                this.maze.connectCells(p1, p2)
                this.unionFind.union(p1, p2)
            }
            this.maze.setColor(p1, VISITED_COLOR)
            this.maze.setColor(p2, VISITED_COLOR)
        }
        this.stepCount++
    }
}
