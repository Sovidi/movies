import './App.scss';
import { Context, MyContext } from './Context';
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import List from './component/List';
import Pop from './component/Pop';
import Tv from './component/Tv';
import Main from './component/Main';
import { useState } from 'react';


function App() {
  const [cl, setCl] = useState("");
  return (
    <Context>
      <HashRouter>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/movie">Movie</Link>
          <Link to="/tv">TV</Link>
        </nav>
        <main>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/movie' element={<List/>}></Route>
            <Route path='/tv' element={<Tv/>}></Route>
            <Route path='/pop' element={<Pop/>}></Route>
          </Routes>
        </main>
      </HashRouter>
    </Context>
  );
}

export default App;
