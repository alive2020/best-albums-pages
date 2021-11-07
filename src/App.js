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
import './styles/myStyles.css';

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
      setError('You have entered an invalid email or password!');
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

  // Get current albums
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <Switch>
        <Route path='/login' exact>
          {<LoginForm login={login} error={error} />}
        </Route>
        <Route path='/'>
          {user.isUserAuthenticated ? (
            <div className='homeContainer'>
              <div className='container logoutBtn'>
                <button className='btn btn-secondary btn-sm ' onClick={logOut}>
                  Logout
                </button>
              </div>
              <div className='container mt-5 albumsContainer'>
                <h1 className='mb-3 text-center text-uppercase homeTitle'>
                  The Best Albums of 2021
                </h1>

                <br />
                <Albums
                  albums={currentAlbums}
                  loading={loading}
                  images={images}
                />
                <Pagination
                  albumsPerPage={albumsPerPage}
                  totalAlbums={albums.length}
                  paginate={paginate}
                />
              </div>
            </div>
          ) : (
            <Redirect to='/login' />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
