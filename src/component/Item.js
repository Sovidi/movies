import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MyContext } from '../Context';

function Item({item}) {
  const {data, fetchFn} = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <li>
      <code>{item.original_title}</code>
      <code>{item.original_name}</code>
      <a onClick={()=>{navigate("/pop", {state:{item}})}}></a>
      <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
      <Link to={`/pop/${item.id}`}>쟈세희 뵤귀</Link>
    </li>
  )
}

export default Item