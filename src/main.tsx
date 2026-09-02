import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@jurgenbaldacchino/phaser-showcase/dist/phaser-showcase.css"
import "@/styles/global.css"
import App from "@/App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
