import React, { useState } from "react";
import Data from "./data.json";

const PaginationData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstInedx = lastIndex - recordsPerPage;
  const records = Data.slice(firstInedx, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  console.log(numbers, firstInedx, lastIndex, records);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  //   console.log(records);

  return (
    <div>
      <table className="table">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </thead>
        <tbody>
          {records.map((d, i) => {
            return (
              <tr key={i}>
                <td>{d.ID}</td>
                <td>{d.Name}</td>
                <td>{d.Email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className="pagination">
        <ul>
          <li className="page-item">
            <a className="page-link" href="#" onClick={prePage}>
              Prev
            </a>
          </li>

          {numbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage === pgNumber ? "active" : ""
              } `}
            >
              <a
                onClick={() => changeCPage(pgNumber)}
                className="page-link"
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationData;
