import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../Context'
import Item from './Item';

function List() {
  let {data, fetchFn, num, setNum, cat, setCat, media, setMedia} = useContext(MyContext);
  const elInput = useRef();
  const bfBttn = useRef();

  const searching = (e) => {
    e.preventDefault();
    fetchFn("search", elInput.current.value);
  };

  const pagingCat = (type) => {
    setCat(type);
    setNum(1);
    fetchFn("get", num);
    bfBttn.current.style = "display:none"
  };

  const pagingBefore = (e) => {
    setNum(--num);
    fetchFn("get", num);
    if (num <= 2) {bfBttn.current.style = "display:none"} else {bfBttn.current.style = "display:block"};
  };

  const pagingNext = () => {
    setNum(++num);
    fetchFn("get", num);
    bfBttn.current.style = "display:block"
  };

  useEffect(()=>{
    setMedia("movie");
    setCat("popular");
    setNum(1);
    fetchFn("get", "");
  }, []);

  return (
    <>
      <button name="popular" onClick={(e)=>{pagingCat("popular")}}>최신영화</button>
      <button name="topRated" onClick={(e)=>{pagingCat("top_rated")}}>인기영화</button>
      <button name="upcoming" onClick={(e)=>{pagingCat("upcoming")}}>곧 개봉할 영화</button>
      <br/><br/>
      <button style={{display:"none"}} ref={bfBttn} name="before" onClick={(e)=>{pagingBefore(e)}}>이전</button>
      <button name="next" onClick={()=>{pagingNext()}}>다음</button>
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