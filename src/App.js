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
  const [addPop, setaddPop] = useState({ visible: false, type: 'Add', id: '' });
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/albums'
      );
      const response = res.data;
      setAlbums(response.reverse());
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
  const handleAdd = async () => {
    // const res = await fetch('https://jsonplaceholder.typicode.com/albums', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title: input,
    //     userId: 1,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/albums',
      {
        title: input,
        userId: 1,
      }
    );
    const response = res.data;
    console.log('add', response);
    // .then((res) => res.json())
    // .then((json) => {
    //   let temp = albums;
    //   temp.unshift(json);
    //   setAlbums(temp);
    //   setaddPop(false);
    //   setInput('');
    // });
  };

  const handleChange = async () => {
    await axios
      .patch(`https://jsonplaceholder.typicode.com/albums/${addPop.id}`, {
        title: input,
      })
      .then((res) => {
        console.log(res.data);
        let temp = albums;
        let thatAlbum = temp.filter((adad) => adad.id === addPop.id)[0];
        thatAlbum.title = input;
        temp = temp.filter((it) => it.id != addPop.id);
        temp.unshift(thatAlbum);
        setAlbums(temp);
        setaddPop({ type: 'Add', id: '', visible: false });
      })
      .catch((e) => console.log(e));
  };

  function doEdit(val, id) {
    setInput(val);
    setaddPop({ type: 'Edit', visible: true, id: id });
  }

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
                <button
                  onClick={() => setaddPop({ visible: true, type: 'Add' })}
                >
                  Add album
                </button>
                <br />
                <Albums
                  albums={currentAlbums}
                  loading={loading}
                  images={images}
                  edit={doEdit}
                />
                <Pagination
                  albumsPerPage={albumsPerPage}
                  totalAlbums={albums.length}
                  paginate={paginate}
                />
              </div>
              <div
                style={{
                  display: addPop.visible ? 'flex' : 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 99,
                  width: '100vw',
                  height: '100vh',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    background: 'yellow',
                    width: 300,
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <input
                      placeholder='title'
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <br />
                    <button
                      onClick={addPop === 'Add' ? handleAdd : handleChange}
                    >
                      {addPop.type}
                    </button>
                    <button
                      onClick={() => {
                        setInput('');
                        setaddPop({ ...addPop, visible: false, id: '' });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
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
