import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Grid from '../components/Grid'

function MainPage () {
  const [grid, setGrid] = useState(null)
  const [clear_spreadsheet_signal, setClear_spreadsheet_signal] = useState(
    false
  )
  const [new_col_name, setNew_col_name] = useState('')
  const [rowSize, setRowSize] = useState(11)

  const [column_names, setColumn_names] = useState([
    '',
    'person_location',
    'match_count',
    'time_taken(s)',
    'miles_travelled',
    'fuel_used',
    'number_vehicles',
    'registration_id'
  ])

  /**
   * Generates CSV from grid state and downloads
   */
  function generateCSV () {
    let csv_string_list = []
    let x = column_names.join(',')
    csv_string_list.push(x)

    for (let i = 0; i < grid.length; i++) {
      let csv_string = ''
      for (let j = 0; j < grid[0].length; j++) {
        csv_string += grid[i][j].content + ','
      }
      csv_string = grid[i][0].x + ',' + csv_string
      csv_string_list.push(csv_string)
    }

    // encoding the csv string to be downloaded by hidden link element
    let encodedUri = encodeURI(csv_string_list.join('\n'))
    let hiddenElement = document.createElement('a')
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodedUri
    hiddenElement.target = '_blank'
    hiddenElement.download = `spreadsheet-data-${new Date().getTime()}.csv`
    hiddenElement.click()
  }

  /**
   * Clears the spreadsheet completely and resets the grid state
   */
  function clearSpreadsheet () {
    for (let i = 1; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j].content = ''
      }
    }

    setClear_spreadsheet_signal(true)
    setTimeout(() => {
      setClear_spreadsheet_signal(false)
    }, 1000)
  }

  /**
   * Adds a new column based on the new column name from input field
   */
  function addNewColumn () {
    if (new_col_name !== null && new_col_name !== '') {
      setColumn_names(prev_col_names => [...prev_col_names, new_col_name])
      setNew_col_name('')
    }
  }

  useEffect(() => {
    /**
     * Initialise grid with coordinates, column name and content.
     * Method called on change of column names or row size
     */
    function initGrid () {
      let temp_grid = []
      for (let i = 0; i < rowSize; i++) {
        let current_row = []
        for (let j = 0; j < column_names.length - 1; j++) {
          let cell_content = ''
          if (grid !== null) {
            cell_content =
              i < grid.length && j < grid[0].length ? grid[i][j].content : ''
          }

          let cell_model = {
            x: i,
            y: j,
            column_name: column_names[j],
            content: cell_content.trim()
          }
          current_row.push(cell_model)
        }
        temp_grid.push(current_row)
      }

      setGrid(temp_grid)
    }

    initGrid()
  }, [rowSize, column_names])

  return (
    <>
      <div className='mt-5 mb-5 mb-md-0'>
        <h1 className='display-3 fw-bold'>SPREADSHEET</h1>
        <h6>
          Fournir Innovations Pvt Ltd. Internship Assignment by{' '}
          <span>
            <b>
              <a
                className='link-primary'
                href='https://ayangupta.herokuapp.com'
              >
                Ayan Gupta
              </a>
            </b>
          </span>
        </h6>
        <br />

        <div className='content-wrapper d-flex me-auto ms-auto flex-column flex-md-row justify-content-md-evenly align-items-center gap-md-0 gap-2'>
          <div className='d-flex gap-3'>
            <Button buttonText={'ADD COLUMN'} handleOnClick={addNewColumn} />
            <input
              type='text'
              placeholder='Column name'
              value={new_col_name}
              onChange={e => {
                setNew_col_name(e.target.value)
              }}
            />
          </div>

          <div className='d-flex gap-3'>
            <Button
              handleOnClick={() => {
                setRowSize(prev_row_size => prev_row_size + 1)
              }}
              buttonText={'ADD ROW'}
            />

            <Button
              className='btn btn-outline-dark'
              handleOnClick={() => {
                setRowSize(prev_row_size => prev_row_size - 1)
              }}
              buttonText={'REMOVE ROW'}
            />
          </div>

          <Button
            handleOnClick={clearSpreadsheet}
            buttonText={'CLEAR SPREADSHEET'}
          />
        </div>

        <div className='grid-wrapper'>
          <Grid
            grid={grid}
            column_names={column_names}
            setGrid={setGrid}
            clear_spreadsheet_signal={clear_spreadsheet_signal}
          />
        </div>

        <br />

        {grid && (
          <div className='d-flex justify-content-center align-items-center gap-3'>
            <Button buttonText={'GENERATE CSV'} handleOnClick={generateCSV} />
          </div>
        )}
      </div>
    </>
  )
}

export default MainPage
