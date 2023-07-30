import { render } from "@testing-library/react"
import Cell from "./Cell"

const TEST_CELLS = [
    {   flipCellsAroundMe: ()=>{},    isLit: 100 },
    {   flipCellsAroundMe: ()=>{},    isLit: 0 }
]

// Smoke test
it("renders without crashing", ()=>{
    let {flipCellsAroundMe, isLit} = TEST_CELLS[0]

    render(
        <Cell
            flipCellsAroundMe={flipCellsAroundMe}
            isLit={isLit}
        />
    )
})

// Snapshot Test
it("matches snapshot", ()=>{
    let {flipCellsAroundMe, isLit} = TEST_CELLS[0]
    const {asFragment} = render(
        <Cell
            flipCellsAroundMe={flipCellsAroundMe}
            isLit={isLit}
        />
    )
    expect(asFragment()).toMatchSnapshot()
})