import * as React from "react"
import { useState, useEffect } from "react"

import { Maze, MazeAlgorithm } from "../Algorithms/Maze"
import { MazeDisplay } from "./MazeDisplay"

import "./App.css"
import { RecursiveBacktracker } from "../Algorithms/RecursiveBacktracker"
import { Kruskal } from "../Algorithms/Kruskal"
import { Wilson } from "../Algorithms/Wilson"
import { RecursiveDivision } from "../Algorithms/RecursiveDivision"

let algorithm: MazeAlgorithm = new RecursiveBacktracker(new Maze(8, 8))
const BACKTRACKER = "Recursive backtracker"
const KRUSKAL = "Kruskal"
const WILSONS = "Wilson's"
const DIVISION = "Recursive division"
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
            algorithm = new RecursiveBacktracker(maze)
        } else if (algoName == KRUSKAL) {
            algorithm = new Kruskal(maze)
        } else if (algoName == WILSONS) {
            algorithm = new Wilson(maze)
        } else if (algoName == DIVISION) {
            algorithm = new RecursiveDivision(maze)
        }
        forceUpdate()
    }

    useEffect(() => {
        restart()
    }, [algoName, mazeCols, mazeRows])

    return (
        <div className="app">
            <div className="control-panel">

                <div className="control-group">
                    <label>Algorithm</label>
                    <select 
                        className="control" 
                        onChange={(event) => {
                            setAlgoName(event.target.value)
                        }}
                    >
                        <option>{BACKTRACKER}</option>
                        <option>{KRUSKAL}</option>
                        <option>{WILSONS}</option>
                        <option>{DIVISION}</option>
                    </select>
                </div>

                <div className="control-group">
                    <label>Number of columns</label>
                    <input 
                        className="control" 
                        type="number" 
                        defaultValue={DEFAULT_COLS} 
                        onChange={onSelectNCols}
                    />
                </div>

                <div className="control-group">
                    <label>Number of rows</label>
                    <input 
                        className="control" 
                        type="number" 
                        defaultValue={DEFAULT_ROWS} 
                        onChange={onSelectNRows}
                    />
                </div>
                
                <div className="control-group">
                    <button 
                        className="control"
                        disabled={algorithm.isFinished()} 
                        onClick={onStepClick}
                    >
                        Step
                    </button>

                    <button 
                        className="control"
                        disabled={algorithm.isFinished()} 
                        onClick={onFinishClick}
                    >
                        Finish
                    </button>

                    <button 
                        className="control"
                        onClick={restart}
                    >
                        Restart
                    </button>
                </div>
            </div>
            <div className="maze-panel">
                <MazeDisplay maze = {algorithm.maze}/>
            </div>
        </div>
    )
}
