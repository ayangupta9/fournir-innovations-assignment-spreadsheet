import React, { useEffect, useState } from 'react'

function Cell ({
  cell,
  clear_spreadsheet_signal,
  get_selected_cell,
  get_blurred_cell
}) {

  const [cell_value, setCell_value] = useState('')
  useEffect(() => {
    setCell_value('')
  }, [clear_spreadsheet_signal])

  return (
    <>
      {cell.x >= 0 && cell.y >= 0 ? (
        <td className='border-1 p-0'>
          <input
            onFocus={() => {
              get_selected_cell(cell.x, cell.y)
            }}
            onBlur={() => {
              get_blurred_cell(cell.x, cell.y)
            }}
            onChange={e => {
              setCell_value(e.target.value)
              cell.content = e.target.value
            }}
            value={cell_value}
            type='text'
            className='m-0 p-0 cell-input'
          />
        </td>
      ) : null}
    </>
  )
}

export default Cell
