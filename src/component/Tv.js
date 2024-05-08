import React, { useContext, useEffect, useRef, useState } from 'react'
import { MyContext } from '../Context'
import Item from './Item';
import styles from "../css/contents.module.scss"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

function Tv() {
  const { data, fetchFn, cat, setCat, media, setMedia, setNavBttn, sInp, setSInp, setSDet } = useContext(MyContext);
  let {num, setNum} = useContext(MyContext);
  const elInput = useRef();
  const bfBttn = useRef();
  const navi = useNavigate();
  let [pNum, setPNum] = useState(1);
  const {pMedia} = useParams();


  const searching = async (e) => {
    e.preventDefault();
    setSInp(elInput.current.value);
    await fetchFn("search", elInput.current.value);
    setSDet(Date.now());
    navi(`/search/${pMedia}`);
  };

  useEffect(()=>{
		setNavBttn("tv");
	}, []);

  const pagingCat = async (type) => {
    setCat(type);
    setNum(1);
  };

  const pagingBefore = async (e) => {
    setNum(--num);
  };

  const pagingNext = async () => {
    setNum(++num);
  };

  const pMore = () => {
    fetchFn("more", pNum);
    setPNum(++pNum);
  };

  useEffect(() => {
    setMedia(pMedia);
    setCat("popular");
    setNum(1);
  }, [])


  return (
    <section className={styles.contents}>
      <div className={styles.contentsBox}>
        <button name="popular" className={cat == "popular" ? styles.active : ""} onClick={(e) => { pagingCat("popular"); }}>인기</button>
        <button name="topRated" className={cat == "top_rated" ? styles.active : ""} onClick={(e) => { pagingCat("top_rated"); }}>최신</button>
        <button name="onTheAir" className={cat == "on_the_air" ? styles.active : ""} onClick={(e) => { pagingCat("on_the_air"); }}>방영중</button>
      </div>
      <div className={styles.pagingBox}>
        <button className={`${styles.bfBttn} ${num <= 1 ? styles.active : ""}`} ref={bfBttn} name="before" onClick={(e) => { pagingBefore(e) }}>이전</button>
        <p>현재 페이지 {num}</p>
        <button className={styles.bfBttn} name="next" onClick={() => { pagingNext() }}>다음</button>
      </div>
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
      {/* <button onClick={()=>{pMore()}}>더보기 text</button> */}
    </section>
  )
}

export default Tv