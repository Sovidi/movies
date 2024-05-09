import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../Context';
import styles from "../css/pop.module.scss"
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import pPic from "../asset/person.png"
import moviePic from "../asset/movie.png"


function Pop() {
  const { data, fetchFn, mId, setMId, media, setMedia, setNavBttn } = useContext(MyContext);
  const [dt, setDt] = useState([]);
  const location = useLocation();
  const [items, setItems] = useState([]);
  const LItems = location.state.item;
  const navi = useNavigate();
  const {pMedia} = useParams();

  useEffect(()=>{
    setMedia(pMedia);
    setNavBttn(pMedia);
  }, []);

  useEffect(()=>{
    setItems(LItems);
  }, [LItems]);

  // console.log(location);

  // const { code } = useParams();
  // let detail = data.filter(item => item.id == code);

  const params = {
		spaceBetween: 30,
		navigation: true,
		modules: [Navigation],
		onSlideChange: () => console.log('slide change'),
		onSwiper: (swiper) => console.log(swiper),
		breakpoints: {
			380: {slidesPerView: 2},
			800: {slidesPerView: 3},
			1000: {slidesPerView: 5}
		}
	}


  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: "f89a6c1f22aca3858a4ae7aef10de967" }
  });

  const dtLd = async () => {
    const dataSet = [
      await instance.get(`/${pMedia}/${items.length ? items.id : LItems.id}`),
      await instance.get(`/${pMedia}/${items.length ? items.id : LItems.id}/credits`),
      await instance.get(`/${pMedia}/${items.length ? items.id : LItems.id}/videos`),
      await instance.get(`/${pMedia}/${items.length ? items.id : LItems.id}/similar`),
    ]
    setDt(dataSet);
    console.log(dataSet);
  };

  useEffect(() => {
    dtLd();
  }, [media, LItems]);

  useEffect(() => {
    console.log(dt);
  }, [dt[0], dt[1], dt[2], dt[3]]);

  if (!dt[0] || !dt[1] || !dt[2] || !dt[3]) return <>로딩중</>
  // else if(!dt[0].data.genres) return <>로딩중</>
  return (
    <section className={styles.popBox}>
      <div className={styles.bPoster} style={{"background-image" : `url(https://image.tmdb.org/t/p/original/${dt[0].data.backdrop_path})`}}/>
      <div className={styles.titleBox}>
        <div className={styles.titlePosterBox}>
          <figure>
            <img src={`${dt[0].data.poster_path ? `https://image.tmdb.org/t/p/w500/${dt[0].data.poster_path}` : moviePic}`} />
          </figure>
        </div>
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
            <p className={styles.timeTitle}>Released</p>
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
      <div className={styles.similarBox}>
        <p className={styles.title}>비슷한 작품</p>
        <Swiper
          {...params}
        >
          {
            dt[3].data.results.map(item => (
                <SwiperSlide>
                  <figure onClick={()=>{navi(`/pop/${pMedia}`, {state:{item}}); window.scrollTo(0, 0)}} className={styles.simContent}>
                    <figcaption>{item.title}{item.name}</figcaption>
                    <img src={`${item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : moviePic}`} />
                  </figure>
                </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>
  )
}

export default Pop