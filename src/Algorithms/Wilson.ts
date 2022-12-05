import { Maze, MazeAlgorithm } from "./Maze";

// https://weblog.jamisbuck.org/2011/1/20/maze-generation-wilson-s-algorithm.html
export class Wilson implements MazeAlgorithm {
    maze: Maze
    
    constructor(maze: Maze) {
        this.maze = maze
    }

    step(): boolean {
        // TODO
        return false
    }
}
