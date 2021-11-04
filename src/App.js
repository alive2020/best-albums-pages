import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Albums from './components/Albums';

function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

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

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>The Best Albums 2021</h1>
      <Albums albums={albums} loading={loading} />
    </div>
  );
}

export default App;
