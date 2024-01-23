import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../Context';
import styles from "../css/contents.module.scss"
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import pPic from "../asset/person.png"


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
      await instance.get(`/${media}/${items.id}/credits`),
      await instance.get(`/${media}/${items.id}/videos`),
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
          <p className={styles.titleName}>{dt[0].data.original_title ? dt[0].data.original_title : dt[0].data.original_name}</p>
          <div className={styles.genresBox}>
            {
              dt[0].data.genres.map(item => (
                <p>{item.name}</p>
              ))
            }
          </div>
          <div className={styles.descBox}>
            <p className={styles.descTitle}>Desc.</p>
            <p className={styles.descText}>{dt[0].data.overview}</p>
          </div>
          <div className={styles.timeBox}>
            <p className={styles.timeTitle}>Realeased</p>
            <p className={styles.time}>{dt[0].data.release_date ? dt[0].data.release_date : dt[0].data.first_air_date}</p>
          </div>
          <div>
            <a href={`${dt[0].data.homepage}`} target='blank'>홈페이지 바로가기</a>
          </div>
        </div>
      </div>
      <div className={styles.castBox}>
        <p>출연진</p>
        <div className={styles.pics}>
        {
          dt[1].data.cast.map(item => (
            <figure className={styles.castPic}>
              <img src={`${item.profile_path ? `https://image.tmdb.org/t/p/w500/${item.profile_path}` : pPic}`} />
              <figcaption>{item.name}</figcaption>
            </figure>
          ))
        }
        </div>
      </div>
      <div className={styles.videoBox}>
        <p>관련영상</p>
      <div className={styles.vids}>
      {
          dt[2].data.results.map(item=>(
            <figure>
              <figcaption>{item.name}</figcaption>
              <iframe src={`https://www.youtube.com/embed/${item.key}`} allowfullscreen></iframe>
            </figure>
          ))
      }
      </div>
      </div>
    </section>
  )
}

export default Pop