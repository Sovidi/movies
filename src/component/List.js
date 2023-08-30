import React, { useContext, useRef } from 'react'

import { MyContext } from '../Context'
import Item from './Item';

function List() {
  const {data, fetchFn, num} = useContext(MyContext);
  const elInput = useRef();

  const searching = (e) => {
    e.preventDefault();
    fetchFn("search", elInput.current.value);
    console.log("submit!")
  }

  const next = (e) => {
    fetchFn("next", "")
  }  
  const before = (e) => {
    fetchFn("before", "")
  }


  console.log(data[0]);
  if(!data.length) {
    return<>....</>
  }

  return (
    <>
      <button name="before" onClick={(e)=>{before(e)}}>이전</button>
      <button name="next" onClick={(e)=>{next(e)}}>다음</button>
      <p>현재 페이지{num}</p>
      <form onSubmit={(e)=>{searching(e)}}>
        <input ref={elInput} name="search"></input>
        <button>찾기</button>
        <ul>
            {
                data.map(item => (
                    <Item key={item.id} item={item}></Item>
                ))
            }
        </ul>
      </form>
    </>
  )
}

export default List