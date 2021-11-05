import React from 'react';

const Albums = ({ albums, loading, images }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(images.map((img) => img.urls.small));
  return (
    <div>
      <ul className='list-group mb-4'>
        {albums.map((album) => (
          <div key={album.id}>
            <li className='list-group-item'>
                <img src='https://via.placeholder.com/100' alt='' />
              {album.title}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
