import './App.scss';
import { Context, MyContext } from './Context';
import { useContext } from 'react';
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import List from './component/List';
import Pop from './component/Pop';
import Item from './component/Item';


function App() {
  // const {data, fetchFn} = useContext(MyContext);

  return (

      <HashRouter>
        <header>
          <nav>
            <Link to="/">홈</Link>
          </nav>
        </header>
        <main>
        <Context>
          <Routes>
            <Route path='/' element={<List/>}></Route>
            <Route path='/pop/:code' element={<Pop/>}></Route>
          </Routes>
          </Context>
        </main>
      </HashRouter>

    
  );
}

export default App;
