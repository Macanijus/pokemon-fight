import "../App.css";
import { useState } from "react";

export default function Pagination({
  articlesPerPage,
  totalArticles,
  paginate,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  const start = (currentPage - 1) * 10;
  const end = start + 10;
  const currentPageNumbers = pageNumbers.slice(start, end);
  return (
    <nav>
      <ul className="pagination-container">
        <div className="pagination-previous-next">
          {currentPage !== 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="pic"
            >
              Previous
            </button>
          )}
        </div>
        {currentPageNumbers.map((number) => (
          <li key={number} className="pagination-item">
            <a
              onClick={() => paginate(number)}
              href="#"
              className="pagination-link"
            >
              <button className="pic">{number}</button>
            </a>
          </li>
        ))}
        <div className="pagination-previous-next">
          {currentPage !== Math.ceil(totalArticles / articlesPerPage) && (
            <button
              className="pic"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </ul>
    </nav>
  );
}
