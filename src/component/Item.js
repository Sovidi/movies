import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../Context';
import styles from "../css/contents.module.scss";
import cPoster from "../asset/movie.png";

function Item({item}) {
  const {data, fetchFn, media} = useContext(MyContext);
  const navi = useNavigate();

  return (
    <li onClick={()=>{navi(`/pop/${media}`, {state:{item}})}} className={styles.mGrid}>
      <code className={styles.title}>{item.original_title}{item.original_name}</code>
      <figure>
        <img src={`${item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : "./movie.png"}`}/>
      </figure>
      {/* <Link to={`/pop/${item.id}`}>자세히 보기</Link> */}
    </li>
    
  )
}

export default Item