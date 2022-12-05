import { Maze, MazeAlgorithm } from "./Maze";

export class RecursiveBactracker implements MazeAlgorithm {
    maze: Maze
    
    constructor(maze: Maze) {
        this.maze = maze
    }

    step(): boolean {
        // TODO
        return false
    }
}
