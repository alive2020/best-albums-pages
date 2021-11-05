import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import Albums from './components/Albums';
import Pagination from './components/Pagination';
import LoginForm from './components/LoginForm';

function App() {
  const adminUser = {
    email: 'admin@admin.com',
    password: 'admin001',
  };

  const [user, setUser] = useState({ email: '', isUserAuthenticated: false });
  const [error, setError] = useState('');

  const login = (details) => {
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      setUser({
        email: details.email,
        isUserAuthenticated: true,
      });
      return true;
    } else {
      setError('Details do not match');
      return false;
    }
  };
  const logOut = () => {
    setUser({ email: '', isUserAuthenticated: false });
  };
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

  let clientId = 'MDY3cSHqf2obvIj97MwhF3Dd787RcAnErVVJlTsgjbE';
  let endpoint = `https://api.unsplash.com/photos?query=band&client_id=${clientId}`;

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     setLoading(true);
  //     const res = await axios.get(endpoint);
  //     setImages(res.json());
  //     setLoading(false);
  //   };

  //   fetchImages();
  // }, []);

  // fetch(endpoint)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (jsonData) {
  //     setImages(jsonData);
  //   });
  // Get current albums
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const nextPage = (pageNumber) => setCurrentPage(pageNumber + 1);
  // const prevPage = (pageNumber) => setCurrentPage(pageNumber - 1);

  return (
    <Router>
      <Switch>
        <Route path='/login' exact>
          {<LoginForm login={login} error={error} />}
        </Route>
        <Route path='/'>
          {user.isUserAuthenticated ? (
            <div className='container mt-5'>
              <h1 className='text-primary mb-3 text-center'>
                The Best Albums 2021
              </h1>
              <p onClick={logOut}>log out</p>
              <Albums
                albums={currentAlbums}
                loading={loading}
                images={images}
              />
              <Pagination
                albumsPerPage={albumsPerPage}
                totalAlbums={albums.length}
                paginate={paginate}
                // nextPage={nextPage}
                // prevPage={prevPage}
              />
            </div>
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
      </Switch>
    </Router>

    // <div className='container mt-5 '>
    //   <div>
    //     {user.email !== '' ? (
    //       <div className='m-2 position-right'>
    //         <button className='btn btn-secondary btn-sm ' onClick={Logout}>
    //           Logout
    //         </button>
    //       </div>
    //     ) : (
    //       <LoginForm Login={Login} error={error} />
    //     )}
    //   </div>
    //   <h1 className='text-primary mb-3 text-center'>The Best Albums 2021</h1>
    //   <Albums albums={currentAlbums} loading={loading} images={images} />
    //   <Pagination
    //     albumsPerPage={albumsPerPage}
    //     totalAlbums={albums.length}
    //     paginate={paginate}
    //     // nextPage={nextPage}
    //     // prevPage={prevPage}
    //   />
    // </div>
  );
}

export default App;
