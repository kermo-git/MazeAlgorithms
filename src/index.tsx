import * as React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./Components/App"
import "./index.css"

const element = document.createElement("div")
element.className = "root"
document.body.appendChild(element)
createRoot(element).render(<App/>)
