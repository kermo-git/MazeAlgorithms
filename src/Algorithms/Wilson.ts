import { Maze, MazeAlgorithm, Position, Direction, EMPTY_POSITION_COLOR } from "./Maze";
import { CustomMap, CustomSet, getRandomElement } from "./Utils"

const RANDOM_WALK_COLOR = "#1682f4"
const UST_COLOR = "#f5c016"
const RANDOM_WALK_POS_COLOR = "green"
const CUR_POS_COLOR = "yellow"

// https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm.html
export class Wilson extends MazeAlgorithm {

    private ust = new CustomSet<Position>()

    private currentPos: Position

    private isRandomWalk: boolean = false

    private currentRandomWalkPos: Position

    private randomWalkDirections = new CustomMap<Position, Direction>()

    constructor(maze: Maze) {
        super(maze)
        const firstPos = getRandomElement(maze.allPositions())
        this.ust.add(firstPos)
        maze.setColor(firstPos, UST_COLOR)
    }

    private setRandomWalkDirection(direction: Direction): void {
        this.randomWalkDirections.set(this.currentRandomWalkPos, direction)
    }

    override step(): void {
        if (this.isRandomWalk) {
            if (this.ust.has(this.currentRandomWalkPos)) {
                let p = this.currentPos
                while (!p.equals(this.currentRandomWalkPos)) {
                    this.ust.add(p)
                    this.maze.setColor(p, UST_COLOR)
                    const next = p.move(this.randomWalkDirections.get(p))
                    this.randomWalkDirections.delete(p)
                    this.maze.connectCells(p, next)
                    p = next
                }
                this.maze.setColor(p, UST_COLOR)
                this.isRandomWalk = false
            } else if (this.randomWalkDirections.has(this.currentRandomWalkPos)) {
                let p = this.currentRandomWalkPos
                let isStart = true
                while (isStart || !p.equals(this.currentRandomWalkPos)) {
                    this.maze.setColor(p, EMPTY_POSITION_COLOR)
                    const next = p.move(this.randomWalkDirections.get(p))
                    this.randomWalkDirections.delete(p)
                    p = next
                    isStart = false
                }
                this.maze.setColor(this.currentRandomWalkPos, RANDOM_WALK_POS_COLOR)
            } else {
                if (!this.currentRandomWalkPos.equals(this.currentPos)) {
                    this.maze.setColor(this.currentRandomWalkPos, RANDOM_WALK_COLOR)
                } else {
                    this.maze.setColor(this.currentPos, CUR_POS_COLOR)
                }
                const direction = getRandomElement(this.maze.getNeighborDirections(this.currentRandomWalkPos))
                this.setRandomWalkDirection(direction)
                this.currentRandomWalkPos = this.currentRandomWalkPos.move(direction)
                this.maze.setColor(this.currentRandomWalkPos, RANDOM_WALK_POS_COLOR)
            }
        } else {
            const nonUstPositions = this.maze.allPositions().filter(p => !this.ust.has(p))
            if (nonUstPositions.length == 0) {
                this.finished = true
            } else {
                this.currentPos = getRandomElement(nonUstPositions)
                this.maze.setColor(this.currentPos, CUR_POS_COLOR)
                this.currentRandomWalkPos = this.currentPos
                this.isRandomWalk = true
            }
        }
    }
}
