import './App.scss';
import { Context } from './Context';
import {HashRouter, Routes, Route, Link, BrowserRouter} from "react-router-dom";
import List from './component/List';
import Pop from './component/Pop';
import Tv from './component/Tv';
import Main from './component/Main';
import Header from "./component/Header"
import Search from './component/Search';


function App() {
  return (
    <Context>
      <BrowserRouter basename='movies'>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/list/:pMedia' element={<List/>}/>
            <Route path='/tv/:pMedia' element={<Tv/>}/>
            <Route path='/pop/:pMedia' element={<Pop/>}/>
            <Route path='/search/:pMedia' element={<Search/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </Context>
  );
}

export default App;
