import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../Context'
import Item from './Item';
import styles from "../css/contents.module.scss"


function List() {
  let {data, fetchFn, num, setNum, cat, setCat, media, setMedia, setNavBttn, catBttn, setCatBttn} = useContext(MyContext);
  const elInput = useRef();
  const bfBttn = useRef();

  const searching = (e) => {
    e.preventDefault();
    fetchFn("search", elInput.current.value);
  };

  useEffect(()=>{
		setNavBttn("list");
	}, []);



  const pagingCat = (type) => {
    setCat(type);
    setNum(1);
  };

  const pagingBefore = (e) => {
    setNum(--num);
  };

  const pagingNext = () => {
    setNum(++num);
  };

  useEffect(()=>{
    setMedia("movie");
    setCat("popular");
    setNum(1);
  }, []);

  return (
    <div className={styles.contents}>
      <div className={styles.contentsBox}>
        <button name="popular" className={cat == "popular" ? styles.active : ""} onClick={(e)=>{pagingCat("popular");}}>최신영화</button>
        <button name="topRated" className={cat == "top_rated" ? styles.active : ""} onClick={(e)=>{pagingCat("top_rated");}}>인기영화</button>
        <button name="upcoming" className={cat == "upcoming" ? styles.active : ""} onClick={(e)=>{pagingCat("upcoming");}}>곧 개봉할 영화</button>
      </div>
      <br/><br/>
      <div className={styles.pagingBox}>
        <button className={`${styles.bfBttn} ${num <= 1 ? styles.active : ""}`} ref={bfBttn} name="before" onClick={(e)=>{pagingBefore(e)}}>이전</button>
        <button className={styles.bfBttn} name="next" onClick={()=>{pagingNext()}}>다음</button>
      </div>
      <p>현재 페이지{num}</p>
      <form onSubmit={(e)=>{searching(e)}}>
        <input ref={elInput} name="search"></input>
        <button>찾기</button>
      </form>
      <ul className={styles.conGrid}>
            {
                data.map(item => (
                  <Item key={item.id} item={item}/>
                ))
            }
      </ul>
    </div>
  )

}

export default List