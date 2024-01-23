import './App.scss';
import { Context, MyContext } from './Context';
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import List from './component/List';
import Pop from './component/Pop';
import Tv from './component/Tv';
import Main from './component/Main';
import Header from "./component/Header"
import { useContext } from 'react';


function App() {
  return (
    <Context>
      <HashRouter>
        <Header/>
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
