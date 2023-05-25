import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import Cards from './components/Cards/Cards.jsx';
import Form from './components/Form/Form';
import About from './components/About/About';
import Favorites from './components/Favorites/Favorites';
import { useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const example = {
  name: 'Morty Smith',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
};

function App () {
  //aqui va mi cerebroooooo
  const [ characters, setCharacters ] = useState([]);
  const [ access, setAccess ] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  //MOCK DATA
  const username = 'batman@nnanananana.com';
  const password = 'robin123'

  async function onSearch(id){
    let reponse = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
    try {
      let { data:char } = reponse
        // console.log('DATA', data);
        if (char.name) setCharacters(oldChars => [...oldChars, char]);
        else window.alert(`No hay personajes con ese ID!`);
    } catch (error) {
      alert('AXIIOS ERROR', error);
    }
    
  }

  const onClose = (id) => {
    const filtered = characters.filter(char => char.id !== id );
    setCharacters(filtered)
  }

  const random = () => {
    const idRandom = Math.floor(Math.random()*827)
    onSearch(idRandom)
  }

  const logout = () => {
    setAccess(false);
    navigate("/");
  };

  const login = async (userData) => {
    const { username: email, password } = userData;
    const URL = 'http://localhost:3001/rickandmorty/login/';
    let response = await axios(URL + `?email=${email}&password=${password}`);
    try {
      const { access } = response.data;
       setAccess(access);
       if (!access) alert('AccessDenied');
       access && navigate('/home');
    } catch (error) {
      console.log('AXIIOS ERROR', error);
    }
  };

  let myStyle = { padding: '25px' };
  return (
    <div className='App' style={myStyle}>
      {/* {location.pathname !== '/' && <NavBar onSearch={onSearch}/>} */}
      { location.pathname !== "/" ? <NavBar onSearch={onSearch} random={random} logout={logout}/> : undefined}
      <Routes>
        <Route path='/' element={<Form login={login}/> }/>

        <Route path='/Home' element={<Cards
          characters={characters}
          onClose={onClose}
        />}/>

        <Route path='/About' element={<About />}/>
        <Route path='/Favorites' element={<Favorites />}/>

        {/* <Route path='/detail/:detailId' element={<Detail />}/> */}
      </Routes>
    </div>
  )
}

export default App
