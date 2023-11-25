import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../Context';

function Pop() {
    const location = useLocation();
    let item = location.state.item;

    console.log(item);

    // const location = useLocation();
    // const items = location.state.item;
    // console.log(items.id)

  return (
    <ul>
        <p>{item.original_title}{item.original_name}</p>
        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
        <p>{item.overview}</p>
    </ul>
  )
}

export default Pop