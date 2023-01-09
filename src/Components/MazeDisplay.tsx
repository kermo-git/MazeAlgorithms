import * as React from "react"

import { Maze } from "../Algorithms/Maze";

import "./MazeDisplay.css"

interface Props {
    maze: Maze
}

const CELL_SIZE_PX = 100

export function MazeDisplay({maze}: Props) {
    const width = maze.nColumns()
    const height = maze.nRows()

    let cells = []

    for (let X = 0; X < width; X++) {
        for (let Y = 0; Y < height; Y++) {
            cells.push((
                <div 
                    key = {10*X + Y}
                    className = {
                        "cell" + 
                        (maze.isOpen({X, Y}, "north") ? " north-open" : "") + 
                        (maze.isOpen({X, Y}, "west") ? " west-open" : "")
                    }
                    style = {{
                        gridRow: height - Y,
                        gridColumn: X + 1,
                        backgroundColor: maze.getColor({X, Y})
                    }}
                />
            ))
        }
    }

    return (
        <div 
            className = "maze"
            style = {{
                width: `${width * CELL_SIZE_PX}px`,
                height: `${height * CELL_SIZE_PX}px`
            }}
        >
            {cells}
        </div>
    )
}