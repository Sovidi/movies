import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../Context';
import styles from "../css/contents.module.scss"
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


function Pop() {
  const { data, fetchFn, mId, setMId, media } = useContext(MyContext);
  const [dt, setDt] = useState([]);
  const location = useLocation();
  const items = location.state.item;

  // const { code } = useParams();
  // let detail = data.filter(item => item.id == code);

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: "f89a6c1f22aca3858a4ae7aef10de967" }
  });

  const dtLd = async () => {
    const dataSet = [
      await instance.get(`/${media}/${items.id}`),
      await instance.get(`/${media}/${items.id}/credits`)
    ]
    setDt(dataSet);
  };

  useEffect(() => {
    dtLd();
  }, [media]);

  useEffect(() => {
    console.log(dt);
  }, [dt]);

  if (!dt[0] || !dt[1]) return <>로딩중</>
  // else if(!dt[0].data.genres) return <>로딩중</>
  return (
    <section className={styles.popBox}>
      <div className={styles.titleBox}>
        <figure>
          <img src={`https://image.tmdb.org/t/p/w500/${dt[0].data.poster_path}`} />
        </figure>
        <div className={styles.infoBox}>
          <p>{dt[0].data.original_title ? dt[0].data.original_title : dt[0].data.original_name}</p>
          <div>
            <p>장르</p>
            {
              dt[0].data.genres.map(item => (
                <p>{item.name}</p>
              ))
            }
          </div>
          <div>
            <p>설명</p>
            <p>{dt[0].data.overview}</p>
          </div>
        </div>
      </div>
      <div className={styles.castBox}>
        {
          dt[1].data.cast.map(item => (
            <figure className={styles.castPic}>
              <figcaption>{item.name}</figcaption>
              <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} />
            </figure>
          ))
        }
      </div>
    </section>
  )
}

export default Pop