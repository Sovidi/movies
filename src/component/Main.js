import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context'
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

function Main() {
    const {sec} = useContext(MyContext);

    // 비어있으면 false, 차있으면 true, ! 찍으면 true 와 false 가 반대로
    if(!sec[0] || !sec[1] || !sec[2] || !sec[3]) return <>로딩중</>;
    // if(sec[0] == undefined || sec[1] == undefined || sec[2] == undefined || sec[3] == undefined) return <>로딩중</>;
    return (
        <Swiper
					spaceBetween={30}
					slidesPerView={3}
					navigation={true}
					modules={[Navigation]}
					onSlideChange={() => console.log('slide change')}
					onSwiper={(swiper) => console.log(swiper)}
				>
						<div className='swiper-wrapper'>
						{
                sec[0].data.results.map(item => (
                    <SwiperSlide>
                        <code>{item.original_title}{item.original_name}</code>
                        {/* <a onClick={()=>{navigate("/pop", {state:{item}})}}></a> */}
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
                    </SwiperSlide>
                ))
            }
						</div>
						<div className='swiper-wrapper'>
						{
                sec[1].data.results.map(item => (
                    <li>
                        <code>{item.original_title}{item.original_name}</code>
                        {/* <a onClick={()=>{navigate("/pop", {state:{item}})}}></a> */}
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
                    </li>
                ))
            }
						</div>
						<div className='swiper-wrapper'>
						{
                sec[2].data.results.map(item => (
                    <li>
                        <code>{item.original_title}{item.original_name}</code>
                        {/* <a onClick={()=>{navigate("/pop", {state:{item}})}}></a> */}
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
                    </li>
                ))
            }
						</div>
						<div className='swiper-wrapper'>
						{
                sec[3].data.results.map(item => (
                    <li>
                        <code>{item.original_title}{item.original_name}</code>
                        {/* <a onClick={()=>{navigate("/pop", {state:{item}})}}></a> */}
                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
                    </li>
                ))
            }
						</div>
					</Swiper>
    )
}

export default Main