import * as React from "react"

import { Maze } from "../Algorithms/Maze"
import { MazeDisplay } from "./MazeDisplay"

import "./App.css"

export function App() {
    // TODO:
    // Dropdown menu for selecting algorithm
    // Inputs for maze dimensions
    // Button to advance one step in the algorithm

    return (<MazeDisplay maze = {exampleMaze()}/>)
}

function exampleMaze(): Maze {
    const maze = new Maze(3, 3)

    maze.openWall({X: 0, Y: 0}, "north")
    maze.openWall({X: 0, Y: 1}, "north")
    maze.openWall({X: 0, Y: 2}, "east")
    maze.openWall({X: 1, Y: 2}, "east")
    maze.openWall({X: 2, Y: 2}, "south")
    maze.openWall({X: 2, Y: 1}, "south")
    maze.openWall({X: 2, Y: 0}, "west")
    maze.openWall({X: 1, Y: 0}, "north")
    
    maze.setColor({X: 1, Y: 1}, "lightblue")
    maze.setColor({X: 0, Y: 2}, "gold")

    return maze
}
