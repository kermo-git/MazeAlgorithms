import { Maze, MazeAlgorithm } from "./Maze";

export class Kruskal implements MazeAlgorithm {
    maze: Maze
    
    constructor(maze: Maze) {
        this.maze = maze
    }

    step(): boolean {
        // TODO
        return false
    }
}
