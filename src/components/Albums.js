import React from 'react';

const Albums = ({ albums, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <ul className='list-group mb-4'>
          {albums.map(album => (
              <li key={album.id} className='list-group-item'>
                  {album.title}
              </li>
          ))}
      </ul>
    </div>
  );
};

export default Albums;
