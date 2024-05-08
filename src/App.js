import './App.scss';
import { Context } from './Context';
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import List from './component/List';
import Pop from './component/Pop';
import Tv from './component/Tv';
import Main from './component/Main';
import Header from "./component/Header"
import Search from './component/Search';


function App() {
  return (
    <Context>
      <HashRouter>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/:pMedia/list' element={<List/>}></Route>
            <Route path='/:pMedia/tv' element={<Tv/>}></Route>
            <Route path='/:pMedia/pop' element={<Pop/>}></Route>
            <Route path='/:pMedia/search' element={<Search/>}></Route>
          </Routes>
        </main>
      </HashRouter>
    </Context>
  );
}

export default App;
