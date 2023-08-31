import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../Context';
import Item from './Item';

function Tv() {
    const {data, fetchFn, num} = useContext(MyContext);
    const elInput = useRef();
  
    const searching = (e) => {
      e.preventDefault();
      fetchFn("tvSearch", elInput.current.value);
      console.log("submit!")
    }
  
    const next = (e) => {
      fetchFn("tvNext", "")
    }  
    const before = (e) => {
      fetchFn("tvBefore", "")
    }
    const homeFn = (e) => {
      fetchFn("tvGet", "");
    }
  
    useEffect(()=> {
      homeFn();
      console.log("home is here")
    }, [])
  
  
    console.log(data[0]);
    if(!data.length) {
      return<>....</>
    }
  
  return (
    <div className='listDiv'>
      <button name="before" onClick={(e)=>{before(e)}}>이전</button>
      <button name="next" onClick={(e)=>{next(e)}}>다음</button>
      <p>현재 페이지{num}</p>
      <form onSubmit={(e)=>{searching(e)}}>
        <input ref={elInput} name="search"></input>
        <button>찾기</button>
        <ul className='listUl'>
            {
                data.map(item => (
                    <Item key={item.id} item={item}></Item>
                ))
            }
        </ul>
      </form>
    </div>
  )
}

export default Tv