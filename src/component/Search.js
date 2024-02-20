import React, { useContext, useEffect, useRef } from 'react'
import { MyContext } from '../Context'
import Item from './Item';
import styles from "../css/contents.module.scss"


function Search() {
  const {sData, setSData, fetchFn, setNavBttn, sInp, setSInp, setSDet} = useContext(MyContext);
  let {num, setNum, sNum, setSSnum} = useContext(MyContext);
  const elInput = useRef();
  const bfBttn = useRef();

  const searching = async (e) => {
    e.preventDefault();
    setSInp(elInput.current.value);
    await fetchFn("search", elInput.current.value);
    setSDet(Date.now());
  };

  useEffect(()=>{
		setNavBttn("");
	}, []);

  const pagingBefore = (e) => {
    setSSnum(--sNum);
  };

  const pagingNext = () => {
    setSSnum(++sNum);
  };

  useEffect(()=>{
    setSSnum(1);
    fetchFn("search", "");
  }, []);

  return (
    <section className={styles.contents}>
      <div className={styles.contentsBox}>
      </div>
      <div className={styles.pagingBox}>
        <button className={`${styles.bfBttn} ${sNum <= 1 ? styles.active : ""}`} ref={bfBttn} name="before" onClick={(e)=>{pagingBefore(e)}}>이전</button>
        <p>현재 페이지 {sNum}</p>
        <button className={styles.bfBttn} name="next" onClick={()=>{pagingNext()}}>다음</button>
      </div>
      <form onSubmit={(e)=>{searching(e)}}>
        <input ref={elInput} name="search"></input>
        <button>찾기</button>
      </form>
      <ul className={styles.conGrid}>
            {
                sData.map(item => (
                  <Item key={item.id} item={item}/>
                ))
            }
      </ul>
    </section>
  )

}

export default Search