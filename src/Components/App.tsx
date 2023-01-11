import * as React from "react"
import { useState, useEffect } from "react"

import { Maze, MazeAlgorithm } from "../Algorithms/Maze"
import { MazeDisplay } from "./MazeDisplay"

import "./App.css"
import { RecursiveBactracker } from "../Algorithms/RecursiveBacktracker"
import { Kruskal } from "../Algorithms/Kruskal"

let algorithm: MazeAlgorithm = new RecursiveBactracker(new Maze(8, 8))
const BACKTRACKER = "Recursive backtracker"
const KRUSKAL = "Kruskal"
const DEFAULT_COLS = 8
const DEFAULT_ROWS = 8

export function App() {
    const [forceUpdateFlag, setForceUpdateFlag] = useState(false)

    function forceUpdate() {
        setForceUpdateFlag(!forceUpdateFlag)
    }

    const [algoName, setAlgoName] = useState(BACKTRACKER)
    const [mazeCols, setMazeCols] = useState(DEFAULT_COLS)
    const [mazeRows, setMazeRows] = useState(DEFAULT_ROWS)

    function onSelectNRows(event) {
        const rows = parseInt(event.target.value)
        if (rows > 1) {
            setMazeRows(rows)
        }
    }

    function onSelectNCols(event) {
        const cols = parseInt(event.target.value)
        if (cols > 1) {
            setMazeCols(cols)
        }
    }

    function onStepClick() {
        algorithm.step()
        forceUpdate()
    }

    function onFinishClick() {
        while (!algorithm.isFinished()) {
            algorithm.step()
        }
        forceUpdate()
    }

    function restart() {
        const maze = new Maze(mazeCols, mazeRows)
        if (algoName == BACKTRACKER) {
            algorithm = new RecursiveBactracker(maze)
        } else if (algoName == KRUSKAL) {
            algorithm = new Kruskal(maze)
        }
        forceUpdate()
    }

    useEffect(() => {
        restart()
    }, [algoName, mazeCols, mazeRows])

    return (<>
        <label>Select algorithm:</label>

        <select onChange={(event) => {
            setAlgoName(event.target.value)
        }}>
            <option>{BACKTRACKER}</option>
            <option>{KRUSKAL}</option>
        </select>

        <label>Select number of columns:</label>

        <input type = "number" defaultValue={DEFAULT_COLS} onChange={onSelectNCols}/>

        <label>Select number of rows:</label>

        <input type = "number" defaultValue={DEFAULT_ROWS} onChange={onSelectNRows}/>
        
        <button 
            disabled={algorithm.isFinished()} 
            onClick={onStepClick}
        >
            Step
        </button>

        <button 
            disabled={algorithm.isFinished()} 
            onClick={onFinishClick}
        >
            Finish
        </button>

        <button onClick={restart}>
            Restart
        </button>

        <MazeDisplay maze = {algorithm.maze}/>
    </>)
}
