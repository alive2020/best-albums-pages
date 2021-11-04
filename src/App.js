import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Albums from './components/Albums';
import Pagination from './components/Pagination';

function App() {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(5);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/albums'
      );
      setAlbums(res.data);
      setLoading(false);
    };

    fetchAlbums();
  }, []);


  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/albums'
      );
      setAlbums(res.data);
      setLoading(false);
    };

    fetchAlbums();
  }, []);


  // Get current albums
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const nextPage = (pageNumber) => setCurrentPage(pageNumber + 1);
  // const prevPage = (pageNumber) => setCurrentPage(pageNumber - 1);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3 text-center'>The Best Albums 2021</h1>
      <Albums albums={currentAlbums} loading={loading} />
      <Pagination
        albumsPerPage={albumsPerPage}
        totalAlbums={albums.length}
        paginate={paginate}
        // nextPage={nextPage}
        // prevPage={prevPage}
      />
    </div>
  );
}

export default App;
