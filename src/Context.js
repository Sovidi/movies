import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import axios from "axios";

const MyContext = createContext();

const insert = (state, action) => {
    switch(action.type) {
        case "search" : return action.d.data.results;
        case "upcoming" : return action.d[2].data.results;
        case "topRated" : return action.d[0].data.results;

        case "tvSearch" : return action.d.data.results;
        case "tvGet" : return action.d[1].data.results;
        case "tvTopRated" : return action.d[0].data.results;

        default : return action.d.data.results;
    }
}

function Context({children}) {

    const [data, dispatch] = useReducer(insert, []);
    const [num, setNum] = useState(1);
    const [num2, setNum2] = useState(1);
    const [cat, setCat] = useState("popular");
    const mbBttn = document.querySelector(".mbBttn");
    const tbBttn = document.querySelector(".tbBttn");


    const instance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {api_key: "f89a6c1f22aca3858a4ae7aef10de967"}
    });



    const fetchFn = async (type, data) => {
        console.log(cat)


        let movies = [
            await instance.get(`/movie/top_rated?page=${num}`),
            await instance.get(`/movie/popular?page=${num}`),
            await instance.get(`/movie/upcoming?page=${num}`),
        ]

        let tvs = [
            await instance.get(`/tv/top_rated?page=${num2}`),
            await instance.get(`/tv/popular?page=${num2}`),
            // await instance.get("/tv/upcoming"),
        ]


        // let moviesPr = await Promise.all([movies[0], movies[1], movies[2]])

        let res;
        switch(type) {
            case "search" : 
            res = await instance.get(`/search/movie?query=${data}`);
            break;

            case "next" : 
            setNum(num+1);
            res = await instance.get(`/movie/${cat}?page=${num}`);
            break;

            case "before" : 
            setNum(num-1);
            res = await instance.get(`/movie/${cat}?page=${num}`);
            break;

            case "topRated" : 
            res = await Promise.all([movies[0], movies[1], movies[2]])
            break;

            case "upcoming" : 
            res = await Promise.all([movies[0], movies[1], movies[2]])
            break;



            case "tvSearch" : 
            res = await instance.get(`/search/tv?query=${data}`);
            break;

            case "tvNext" : 
            setNum2(num2+1);
            res = await instance.get(`/tv/${cat}?page=${num2}`);
            break;

            case "tvBefore" : 
            setNum2(num2-1);
            res = await instance.get(`/tv/${cat}?page=${num2}`);
            break;

            case "tvTopRated" : 
            res = await Promise.all([tvs[0], tvs[1], tvs[2]])
            break;

            case "tvUpcoming" : 
            res = await Promise.all([tvs[0], tvs[1], tvs[2]])
            break;

            case "tvGet" : 
            res = await Promise.all([tvs[0], tvs[1], tvs[2]])
            break;



            default : 
            res = await instance.get(`/movie/popular?page=${num}`);
            }
        dispatch({type, d: res});
    }

    useEffect(()=> {
        fetchFn()
    }, [])

    return (
        <MyContext.Provider value={{data, fetchFn, num, setNum, num2, setNum2, cat, setCat}}>
            {children}
        </MyContext.Provider>
    )
}

export {Context, MyContext}