import React, { createRef, useRef } from 'react'
import Cell from './Cell'

function Grid ({ grid, column_names, clear_spreadsheet_signal }) {
  const column_ref = useRef(null)
  const index_ref = useRef(null)

  /**
   * Highlights the index row and column name when a cell is selected in a grid
   * @param {int} x Row number in grid
   * @param {int} y Column number in grid
   */
  function get_selected_cell (x, y) {
    if (column_ref && index_ref) {
      index_ref[x].current.classList.add('cell-selected')
      column_ref[y + 1].current.classList.add('cell-selected')
    }
  }

  /**
   * Deselects the index row and column name when a cell's focus is removed
   * @param {int} x Row number in grid
   * @param {int} y Column number in grid
   */
  function get_blurred_cell (x, y) {
    if (column_ref && index_ref) {
      index_ref[x].current.classList.remove('cell-selected')
      column_ref[y + 1].current.classList.remove('cell-selected')
    }
  }

  return (
    <div className='scrollable-wrapper'>
      <table className='grid-table mt-5'>
        <tbody id='grid'>
          <tr>
            {column_names.map((col, colid) => {
              {
                /* Create ref for each column name cell */
              }
              const col_ref = createRef()
              column_ref[colid] = col_ref

              return (
                <td ref={col_ref} key={colid} className='border-1 p-0'>
                  <div className='col-name-cell m-0 d-flex justify-content-center align-items-center'>
                    {col}
                  </div>
                </td>
              )
            })}
          </tr>
          {grid &&
            grid.map((row, rowId) => {
              {
                /* Create ref for each index cell */
              }
              const row_ref = createRef()
              index_ref[rowId] = row_ref

              return (
                <tr key={rowId}>
                  {row.map((cell, cellId) => {
                    return (
                      <>
                        {cell.y === 0 ? (
                          <td
                            ref={index_ref[rowId]}
                            className='grid-index-cell border-1'
                          >
                            <p className='m-0'>{cell.x}</p>
                          </td>
                        ) : null}

                        <Cell
                          get_blurred_cell={get_blurred_cell}
                          get_selected_cell={get_selected_cell}
                          clear_spreadsheet_signal={clear_spreadsheet_signal}
                          key={cellId}
                          cell={cell}
                        />
                      </>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Grid
