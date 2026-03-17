import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./global.css"
import App from "./app/App.tsx"

const root = document.getElementById("root")
if (!root) throw new Error("Cannot find #root")

createRoot(root).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
)
