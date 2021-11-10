import React from 'react';
import '../styles/myStyles.css';

const Albums = ({ albums, loading, edit, deleteAlbum }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <ul className='list-group mb-4'>
        {albums.map((album) => (
          <div key={album.id}>
            <li className='list-group-item d-flex'>
              <img src='https://via.placeholder.com/100' alt='' />
              <span className='pl-3 text-uppercase d-flex align-items-center '>
                {album.title}
              </span>
              <span>
                <button onClick={() => edit(album.title, album.id)}>
                  Edit
                </button>
                <button onClick={() => deleteAlbum(album.id)}>Delete</button>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
