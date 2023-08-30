import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../Context';

function Pop() {
    const {data, fetchFn} = useContext(MyContext);
    const navigate = useNavigate();

    const {code} = useParams();

    if (code == undefined) {
      navigate("/")
    }

    // const location = useLocation();
    // const items = location.state.item;
    // console.log(items.id)

    let detail = data.filter(item => item.id == code);


  return (
    <ul>
        <p>{detail[0].original_title}</p>
        <img src={`https://image.tmdb.org/t/p/w500/${detail[0].poster_path}`}></img>
        <p>개봉일 {detail[0].release_date}</p>
        <p>{detail[0].overview}</p>
    </ul>
  )
}

export default Pop