import * as React from "react"

import { initializeMaze, openWall, cellAt, Maze } from "../Algorithms/Maze"
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
    const maze = initializeMaze(3, 3)

    openWall(maze, {X: 0, Y: 0}, "north")
    openWall(maze, {X: 0, Y: 1}, "north")
    openWall(maze, {X: 0, Y: 2}, "east")
    openWall(maze, {X: 1, Y: 2}, "east")
    openWall(maze, {X: 2, Y: 2}, "south")
    openWall(maze, {X: 2, Y: 1}, "south")
    openWall(maze, {X: 2, Y: 0}, "west")
    openWall(maze, {X: 1, Y: 0}, "north")
    
    cellAt(maze, {X: 1, Y: 1}).color = "lightblue"
    cellAt(maze, {X: 0, Y: 2}).color = "gold"

    return maze
}
