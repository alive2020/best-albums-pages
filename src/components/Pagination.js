import React from 'react';

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
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
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
