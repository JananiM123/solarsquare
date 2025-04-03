import './App.css';
import { useState } from 'react';

function App() {
  const emptyCell = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  const [cells, setCells] = useState(emptyCell)
  const [isShow, setIsShow] = useState(false)

  const handleCell = (column, row) => {

    let grid = [...cells]
    grid[row][column] = grid[row][column] === 0 ? "" : 0
    setCells(grid)

    let arr = []
    let top = [Array(cells[0].length).fill(0), ...grid]
    let bottom = [...grid, Array(cells[0].length).fill(0)]

    if (row === 0) {
      //Top left corner
      if (column === 0) {
        top.map((val) => arr = [...arr, [0, ...val]])
        setCells(arr)
      }
      //Top right corner
      else if (column === cells[0].length - 1) {
        top.map((val) => arr = [...arr, [...val, 0]])
        setCells(arr)
      }
      //Add one row at top
      else {
        setCells(top)
      }
    }

    if (row === cells.length - 1) {
      //Bottom left corner
      if (column === 0) {
        bottom.map((val) => arr = [...arr, [0, ...val]])
        setCells(arr)
      }
      //Bottom right corner
      else if (column === cells[0].length - 1) {
        bottom.map((val) => arr = [...arr, [...val, 0]])
        setCells(arr)
      }
      //Add one row at Bottom
      else {
        setCells(bottom)
      }
    }

    //Add one column to the left
    if (column === 0 && row !== 0 && row !== cells.length - 1) {
      grid.map((val) => arr = [...arr, [0, ...val]])
      setCells(arr)
    }
    //Add one column to the right
    if (column === cells[0].length - 1 && row !== 0 && row !== cells.length - 1) {
      grid.map((val) => arr = [...arr, [...val, 0]])
      setCells(arr)
    }
  }

  return (
    <div className="App">
      {isShow ?
        <>
          <button className='btnAlign' onClick={() => setIsShow(false)}>Back to Design</button>
        </> :
        <>
          <button className='btnAlign' onClick={() => setIsShow(true)}>Final Design</button>
          <button className='reset' onClick={() => setCells(emptyCell)}>Reset</button>
        </>
      }

      <div className="box">
        {cells.map((arr, rowIndex) => (
          <div key={rowIndex} className='row'>
            {arr.map((val, columnIndex) => (
              <div
                key={columnIndex}
                style={{
                  border: isShow ? " 1px solid white" : "1px solid #d3d3d3",
                  pointerEvents: isShow ? 'none' : "auto"
                }}
                className={val === 0 ? "notSelected" : "selected"}
                onClick={() => handleCell(columnIndex, rowIndex)}>
                {val ? val : ''}
              </div>
            ))
            }
          </div>
        ))
        }
      </div>
    </div>
  )
}
export default App;

