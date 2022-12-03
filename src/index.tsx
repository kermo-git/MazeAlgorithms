import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "./style.css"

function App() {
    return (<>
        <h1>Hello World!</h1>
    </>)
}
const element = document.createElement("div")
document.body.appendChild(element)
createRoot(element).render(<App/>)