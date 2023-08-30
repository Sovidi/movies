import './App.scss';
import { useContext } from 'react';
import { Context, MyContext } from './Context';
import {HashRouter, Routes, Route, Link} from "react-router-dom";
import List from './component/List';
import Pop from './component/Pop';
import Item from './component/Item';


function App() {
  
  // const {fetchFn} = useContext(MyContext);

  return (
    <Context>
      <HashRouter>
        <header>
          <nav>
            <Link to="/">홈</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<List/>}></Route>
            <Route path='/pop/:code' element={<Pop/>}></Route>
          </Routes>
        </main>
      </HashRouter>
    </Context>


    
  );
}

export default App;
