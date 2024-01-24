import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context'
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import styles from "../css/main.module.scss"

function Main() {
	const { sec, setNavBttn } = useContext(MyContext);

	const params = {
		spaceBetween: 30,
		navigation: true,
		modules: [Navigation],
		onSlideChange: () => console.log('slide change'),
		onSwiper: (swiper) => console.log(swiper),
		breakpoints: {
			380: {slidesPerView: 1},
			800: {slidesPerView: 2},
			1000: {slidesPerView: 3}
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
					sec[0].data.results.map(item => (
						<SwiperSlide>
							<figure>
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
							<figure>
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
							<figure>
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
							<figure>
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