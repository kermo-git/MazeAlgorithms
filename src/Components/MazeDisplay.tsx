import * as React from "react"

import { Maze } from "../Algorithms/Maze";

import "./MazeDisplay.css"

interface Props {
    maze: Maze
}

const CELL_SIZE_PX = 100

export function MazeDisplay({maze}: Props) {
    const width = maze.length
    const height = maze[0].length

    let cells = []

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const cell = maze[x][y]

            cells.push((
                <div 
                    key={10*x + y}
                    className={
                        "cell" + 
                        (cell.northOpen ? " north-open" : "") + 
                        (cell.westOpen ? " west-open" : "")
                    }
                    style={{
                        gridRow: height - y,
                        gridColumn: x + 1,
                        backgroundColor: cell.color
                    }}
                />
            ))
        }
    }

    return (
        <div 
            className="maze"
            style={{
                gridTemplateColumns: `repeat(${width}, ${CELL_SIZE_PX}px)`,
                gridTemplateRows: `repeat(${height}, ${CELL_SIZE_PX}px)`,
                width: `${width * CELL_SIZE_PX}px`,
                height: `${height * CELL_SIZE_PX}px`
            }}
        >
            {cells}
        </div>
    )
}