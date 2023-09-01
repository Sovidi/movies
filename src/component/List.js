import React, { useContext, useRef } from 'react'

import { MyContext } from '../Context'
import Item from './Item';

function List() {
  const {data, fetchFn, num, setNum, num2, setNum2, cat, setCat} = useContext(MyContext);
  const elInput = useRef();


  const searching = (e) => {
    e.preventDefault();
    fetchFn("search", elInput.current.value);
    console.log("submit!")
  }





  if(!data.length) {
    return<>....</>
  }

  return (
    <>
      <button name="newMovie" onClick={(e)=>{fetchFn("get", ""); setCat("popular"); setNum(1)}}>최신영화</button>
      <button name="upcoming" onClick={(e)=>{fetchFn("upcoming", ""); setCat("upcoming"); setNum(1)}}>곧 개봉</button>
      <button name="topRated" onClick={(e)=>{fetchFn("topRated", ""); setCat("top_rated"); setNum(1)}}>인기영화</button>
      <br/><br/>
      <button className='mbBttn' name="before" onClick={(e)=>{fetchFn("before", ""); if(num <= 2) {e.target.style = "display:none"} else {e.target.style = "display:block"};}}>이전</button>
      <button name="next" onClick={(e)=>{fetchFn("next", "")}}>다음</button>
      <p>현재 페이지{num}</p>
      <form onSubmit={(e)=>{searching(e)}}>
        <input ref={elInput} name="search"></input>
        <button>찾기</button>
        <ul>
            {
                data.map(item => (
                  <Item item={item}></Item>
                ))
            }
        </ul>
      </form>
    </>
  )
}

export default List