import React from 'react';
import { Link } from 'react-router-dom';
const Pagination = ({
  albumsPerPage,
  totalAlbums,
  paginate,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {/* <li className='page-item'>
          <a className='page-link' href='#' onClick={() => prevPage()}>
            Prev
          </a>
        </li> */}
        {pageNumbers.map((number) => (
          <li key={number} className='page-item'>
            <Link
              onClick={() => paginate(number)}
              to={`/${number}`}
              className='page-link'
            >
              {number}
            </Link>
          </li>
        ))}
        {/* <li className='page-item'>
          <a className='page-link' href='#' onClick={() => nextPage()}>
            Next
          </a>
        </li> */}
      </ul>
    </nav>
  );
};

export default Pagination;
