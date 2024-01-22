import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../Context'
import Item from './Item';
import { async } from 'q';

function Tv() {
  let {data, fetchFn, num, setNum, cat, setCat, media, setMedia} = useContext(MyContext);
  const elInput = useRef();
  const bfBttn = useRef();

  const searching = async (e) => {
    e.preventDefault();
    await fetchFn("search", elInput.current.value);
  };

  const contentsLoading = async () => {
    await setMedia("tv");
    await setCat("popular");
    await setNum(1);
  }

  const pagingCat = async (type) => {
    setNum(1);
    setCat(type);
  };

  const pagingBefore = async (e) => {
    setNum(--num);
  };

  const pagingNext = async () => {
    setNum(++num);
  };

  useEffect(()=>{
    contentsLoading();
  }, [])


  return (
    <div className='TvWrite'>
      <button name="popular" onClick={(e)=>{pagingCat("popular")}}>인기</button>
      <button name="topRated" onClick={(e)=>{pagingCat("top_rated")}}>최신</button>
      <br/><br/>
      <button className={`bfBttn ${num <= 1 ? "active" : ""}`} ref={bfBttn} name="before" onClick={(e)=>{pagingBefore(e)}}>이전</button>
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
    </div>
  )
}

export default Tv