import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../Context'
import Item from './Item';
import styles from "../css/contents.module.scss"

function Tv() {
  let { data, fetchFn, num, setNum, cat, setCat, media, setMedia, setNavBttn } = useContext(MyContext);
  const elInput = useRef();
  const bfBttn = useRef();

  useEffect(()=>{
		setNavBttn("tv");
	}, []);


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

  useEffect(() => {
    contentsLoading();
  }, [])


  return (
    <div className={styles.contents}>
      <div className={styles.contentsBox}>
        <button name="popular" onClick={(e) => { pagingCat("popular") }}>인기</button>
        <button name="topRated" onClick={(e) => { pagingCat("top_rated") }}>최신</button>
        <button name="onTheAir" onClick={(e) => { pagingCat("on_the_air") }}>방영중</button>
      </div>
      <br /><br />
      <div className={styles.pagingBox}>
        <button className={`${styles.bfBttn} ${num <= 1 ? styles.active : ""}`} ref={bfBttn} name="before" onClick={(e) => { pagingBefore(e) }}>이전</button>
        <button className={styles.bfBttn} name="next" onClick={() => { pagingNext() }}>다음</button>
      </div>
      <p>현재 페이지{num}</p>
      <form onSubmit={(e) => { searching(e) }}>
        <input ref={elInput} name="search"></input>
        <button>찾기</button>
      </form>
      <ul className={styles.conGrid}>
          {
            data.map(item => (
              <Item key={item.id} item={item}></Item>
            ))
          }
      </ul>
    </div>
  )
}

export default Tv