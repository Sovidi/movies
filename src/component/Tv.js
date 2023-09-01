import React, { useContext, useEffect, useRef } from 'react'

import { MyContext } from '../Context'
import Item from './Item';

function Tv() {
  const {data, fetchFn, num, setNum, num2, setNum2, cat, setCat} = useContext(MyContext);
  const elInput = useRef();


  const searching = (e) => {
    e.preventDefault();
    fetchFn("tvSearch", elInput.current.value);
    console.log("submit!")
  }

  useRef(()=>{
    fetchFn("tvGet", "")
  }, [])

  if(!data.length) {
    return<>....</>
  }

  return (
    <>
      <button name="popular" onClick={(e)=>{fetchFn("tvGet", ""); setCat("popular"); setNum2(1)}}>최신</button>
      <button name="topRated" onClick={(e)=>{fetchFn("tvTopRated", ""); setCat("top_rated"); setNum2(1)}}>인기</button>
      <br/><br/>
      <button className='tbBttn' name="before" onClick={(e)=>{fetchFn("tvBefore", ""); if(num2 <= 2) {e.target.style = "display:none"} else {e.target.style = "display:block"};}}>이전</button>
      <button name="next" onClick={(e)=>{fetchFn("tvNext", "")}}>다음</button>
      <p>현재 페이지{num2}</p>
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

export default Tv