import * as React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./Components/App"

const element = document.createElement("div")
document.body.appendChild(element)
createRoot(element).render(<App/>)
