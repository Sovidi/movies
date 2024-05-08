import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../Context';
import styles from "../css/contents.module.scss"

function Item({item}) {
  const {data, fetchFn, media} = useContext(MyContext);
  const navi = useNavigate();

  return (
    <li onClick={()=>{navi(`/${media}/pop`, {state:{item}})}} className={styles.mGrid}>
      <code className={styles.title}>{item.original_title}{item.original_name}</code>
      <figure>
        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}/>
      </figure>
      {/* <Link to={`/pop/${item.id}`}>자세히 보기</Link> */}
    </li>
    
  )
}

export default Item