import * as React from "react"

import { Position, Maze } from "../Algorithms/Maze";

import "./MazeDisplay.css"

interface Props {
    maze: Maze
}

export function MazeDisplay({maze}: Props) {
    const width = maze.nColumns()
    const height = maze.nRows()

    let cells = []

    for (let X = 0; X < width; X++) {
        for (let Y = 0; Y < height; Y++) {
            const pos = new Position(X, Y)
            cells.push((
                <div 
                    key = {X + "_" + Y}
                    className = {
                        "cell" + 
                        (maze.isOpen(pos, "north") ? " north-open" : "") + 
                        (maze.isOpen(pos, "west") ? " west-open" : "")
                    }
                    style = {{
                        gridRow: height - Y,
                        gridColumn: X + 1,
                        backgroundColor: maze.getColor(pos)
                    }}
                />
            ))
        }
    }

    return (
        <div 
            className = "maze"
            style = {{
                aspectRatio: `${width} / ${height}`,
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows: `repeat(${height}, 1fr)`
            }}
        >
            {cells}
        </div>
    )
}