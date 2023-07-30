import { render } from "@testing-library/react"
import App from "./App"

// Smoke test
it("renders without crashing", ()=>{
    render(<App/>)
})
