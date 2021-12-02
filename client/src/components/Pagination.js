import React, { useState } from 'react'

function Pagination() {
  let [page, setPage] = useState(1)

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const displayResNumber = () => {
    const showRes = ' Showing Results: '
    if (page == 1) {
      return <p> {showRes}1-100 of 1,000</p>
    }
    if (page == 2) {
      return <p> {showRes}100-200 of 1,000</p>
    }
    if (page == 3) {
      return <p> {showRes}200-300 of 1,000</p>
    }
    if (page == 4) {
      return <p> {showRes}300-400 of 1,000</p>
    }
    if (page == 5) {
      return <p> {showRes}400-500 of 1,000</p>
    }
    if (page == 6) {
      return <p> {showRes}500-600 of 1,000</p>
    }
    if (page == 7) {
      return <p> {showRes}600-700 of 1,000</p>
    }
    if (page == 8) {
      return <p> {showRes}700-800 of 1,000</p>
    }
    if (page == 9) {
      return <p> {showRes}800-900 of 1,000</p>
    }
    if (page == 10) {
      return <p> {showRes}900-1,000 of 1,000</p>
    }
  }

  return (
    <div id="resultsPages">
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td class="pageButton">
              <button onClick={previousPage}>🡸</button>
            </td>
            <td>{displayResNumber()}</td>
            <td>
              <button onClick={nextPage}>🡺</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Pagination
