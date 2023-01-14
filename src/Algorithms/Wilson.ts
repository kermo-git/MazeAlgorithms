import { Maze, MazeAlgorithm, Position, getRandomElement, Direction, EMPTY_POSITION_COLOR } from "./Maze";

const RANDOM_WALK_COLOR = "#1682f4"
const UST_COLOR = "#f5c016"
const RANDOM_WALK_POS_COLOR = "green"
const CUR_POS_COLOR = "yellow"

// https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm.html
export class Wilson extends MazeAlgorithm {

    private ust: Set<string> = new Set()

    private currentPos: Position

    private randomWalk: boolean = false

    private randomWalkPosition: Position

    private randomWalkDirections: Map<string, Direction> = new Map()

    constructor(maze: Maze) {
        super(maze)
        const firstPos = getRandomElement(maze.allPositions())
        this.addToUst(firstPos)
        maze.setColor(firstPos, UST_COLOR)
    }

    private addToUst(pos: Position): void {
        this.ust.add(JSON.stringify(pos))
    }

    private isInUst(pos: Position): boolean {
        return this.ust.has(JSON.stringify(pos))
    }

    private setRandomWalkDirection(direction: Direction): void {
        this.randomWalkDirections.set(JSON.stringify(this.randomWalkPosition), direction)
    }

    private getRandomWalkDirection(pos: Position): Direction {
        return this.randomWalkDirections.get(JSON.stringify(pos))
    }

    override step(): void {
        if (this.randomWalk) {
            if (this.isInUst(this.randomWalkPosition)) {
                let p = this.currentPos
                while (!p.equals(this.randomWalkPosition)) {
                    this.addToUst(p)
                    this.maze.setColor(p, UST_COLOR)
                    const next = p.move(this.getRandomWalkDirection(p))
                    this.maze.connectCells(p, next)
                    p = next
                }
                this.maze.setColor(p, UST_COLOR)
                this.maze.allPositions()
                    .filter(p => this.maze.getColor(p) == RANDOM_WALK_COLOR)
                    .forEach(p => this.maze.setColor(p, EMPTY_POSITION_COLOR))
                this.randomWalk = false
            } else {
                if (!this.randomWalkPosition.equals(this.currentPos)) {
                    this.maze.setColor(this.randomWalkPosition, RANDOM_WALK_COLOR)
                } else {
                    this.maze.setColor(this.currentPos, CUR_POS_COLOR)
                }
                const direction = getRandomElement(this.maze.getNeighborDirections(this.randomWalkPosition))
                this.setRandomWalkDirection(direction)
                this.randomWalkPosition = this.randomWalkPosition.move(direction)
                this.maze.setColor(this.randomWalkPosition, RANDOM_WALK_POS_COLOR)
            }
        } else {
            const nonUstPositions = this.maze.allPositions().filter(p => !this.isInUst(p))
            if (nonUstPositions.length == 0) {
                this.finished = true
            } else {
                this.currentPos = getRandomElement(nonUstPositions)
                this.maze.setColor(this.currentPos, CUR_POS_COLOR)
                this.randomWalkPosition = this.currentPos
                this.randomWalk = true
                this.randomWalkDirections.clear()
            }
        }
    }
}
