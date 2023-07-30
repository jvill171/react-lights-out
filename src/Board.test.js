import { render, fireEvent, queryAllByText } from "@testing-library/react"
import Board from "./Board"

// TEST_BOARD will always be a 100% off board, with all cells turned unlit.
// 3 x 3 board makes checking for a win easy: Click center & corners 1 time
// 0% chance of lights on makes snapshots reliable
const TEST_BOARD = {
    nrows: 3,
    ncols: 3,
    chanceLightStartsOn: 0
}

// Smoke test
it("renders without crashing", ()=>{
    // Uses default values from Board component
    render(<Board/>)
})

// Snapshot test
it("matches snapshot", ()=>{
    let { nrows, ncols, chanceLightStartsOn } = TEST_BOARD
    const {asFragment} = render(
        <Board
            nrows={nrows}
            ncols={ncols}
            chanceLightStartsOn={chanceLightStartsOn}
        />
    )
    expect(asFragment()).toMatchSnapshot()
})

// Cell Clicking
it("flips itself and its 4 neighboring cells", ()=>{
    let { nrows, ncols, chanceLightStartsOn } = TEST_BOARD
    const { container } = render(
        <Board
            nrows={nrows}
            ncols={ncols}
            chanceLightStartsOn={chanceLightStartsOn}
        />
    );

    const centerCell = container.querySelectorAll('.Cell')[4]
    fireEvent.click(centerCell);
    // Check only 5 cells lit up
    expect(container.querySelectorAll('.Cell-lit').length).toEqual(5)

    // List of cells expected to NOT be lit
    const unLit = [0, 2, 6, 8]
    const clickedBoard = container.querySelectorAll('.Cell')
    // Ensure only the correct cells lit up
    for(let i = 0; i<(nrows * ncols); i++){
        // Current status of the cell after the click
        const isCellLit = clickedBoard[i].classList.contains('Cell-lit')
        // What should the status of that cell be?
        const shouldBeLit = !unLit.includes(i)
        expect(isCellLit).toEqual(shouldBeLit)
    }
})

it("removes the game board and displays a winning message when the game is won", ()=>{
    let { nrows, ncols, chanceLightStartsOn } = TEST_BOARD
    const { container, debug } = render(
        <Board
            nrows={nrows}
            ncols={ncols}
            chanceLightStartsOn={chanceLightStartsOn}
        /> 
    );
  
    expect(container.querySelector('table')).toBeInTheDocument();
    expect(queryAllByText(container, "WINNER")).toEqual([]); 

    const boardCells = container.querySelectorAll('.Cell')
    // Click the the corner cells and the center cell,
    // winning in a 3x3 board of fully unlit cells
    fireEvent.click(boardCells[0]); // top-left corner
    fireEvent.click(boardCells[2]); // top-right corner
    fireEvent.click(boardCells[4]); // center
    fireEvent.click(boardCells[6]); // bottom left corner
    fireEvent.click(boardCells[8]); // bottom-right corner

    expect(container.querySelector('table')).not.toBeInTheDocument();
    expect(queryAllByText(container, "WINNER")[0]).toBeInTheDocument();
    
})