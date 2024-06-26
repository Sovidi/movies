import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context'
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from "../css/main.module.scss"
import { useNavigate } from 'react-router-dom';

function Main() {
	const { sec, setNavBttn } = useContext(MyContext);
	const navi = useNavigate();
	const [mEvent, setMEvent] = useState("");

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

	useEffect(()=>{
		setNavBttn("main");
	}, []);

	// 비어있으면 false, 차있으면 true, ! 찍으면 true 와 false 가 반대로
	if (!sec[0] || !sec[1] || !sec[2] || !sec[3]) return <>로딩중</>;
	// if(sec[0] == undefined || sec[1] == undefined || sec[2] == undefined || sec[3] == undefined) return <>로딩중</>;
	return (
		<section className={styles.mainSec}>
			<Swiper
				{...params}
			>
				{
					sec[0].data.results.map((item, key) => (
						<SwiperSlide>
							<figure onClick={()=>{navi(`/pop/movie`, {state:{item}})}}>
								<figcaption>{item.original_title}{item.original_name}</figcaption>
								<img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
							</figure>
							{/* <a onClick={()=>{navigate("/pop", {state:{item}})}}></a> */}
						</SwiperSlide>
					))
				}
			</Swiper>

			<Swiper
				{...params}
			>
				{
					sec[1].data.results.map(item => (
						<SwiperSlide>
							<figure onClick={()=>{navi(`/pop/movie`, {state:{item}})}}>
								<figcaption>{item.original_title}{item.original_name}</figcaption>
								<img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
							</figure>
						</SwiperSlide>
					))
				}
			</Swiper>

			<Swiper
				{...params}
			>
				{
					sec[2].data.results.map(item => (
						<SwiperSlide>
							<figure onClick={()=>{navi(`/pop/tv`, {state:{item}})}}>
								<figcaption>{item.original_title}{item.original_name}</figcaption>
								<img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
							</figure>
						</SwiperSlide>
					))
				}
			</Swiper>

			<Swiper
				{...params}
			>
				{
					sec[3].data.results.map(item => (
						<SwiperSlide>
							<figure onClick={()=>{navi(`/pop/tv`, {state:{item}})}}>
								<figcaption>{item.original_title}{item.original_name}</figcaption>
								<img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
							</figure>
						</SwiperSlide>
					))
				}
			</Swiper>
		</section>
	)
}

export default Main