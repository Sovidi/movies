import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import axios from "axios";

const MyContext = createContext();

const insert = (state, action) => {
    switch(action.type) {
        case "search" : return action.d;
        case "get" : return action.d;
        case "more" : return [...state, ...action.d];
        default : return action.d;
    }
}

function Context({children}) {
    const [data, dispatch] = useReducer(insert, []);
    const [media, setMedia] = useState("movie");
    const [cat, setCat] = useState("popular");
    let [num, setNum] = useState();
    const [sec, setSec] = useState([]);

    const instance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {api_key: "f89a6c1f22aca3858a4ae7aef10de967"}
    });

    const forMain = async () => {
        let res; 
        const mainMvList = [
            await instance.get(`/movie/popular`),
            await instance.get(`/movie/top_rated`),
            await instance.get(`/tv/popular`),
            await instance.get(`/tv/top_rated`)
        ];
        setSec(mainMvList);
    };


    const fetchFn = async (type, data) => {
        let res;
        switch(type) {
            case "search" : 
            res = await instance.get(`/search/${media}?query=${data}`);
            break;

            case "get" :
            res = await instance.get(`/${media}/${cat}?page=${data}`);
            break;

            case "more" :
            res = await instance.get(`/${media}/${cat}?page=${data}`);
            break;
    
            default :
            res = await instance.get(`/${media}/${cat}?page=${data}`);
            }
        dispatch({type, d: res.data.results});
    };

    useEffect(()=> {
        forMain();
        fetchFn();
    }, [])

    return (
        <MyContext.Provider value={{data, fetchFn, num, setNum, cat, setCat, media, setMedia, sec, setSec}}>
            {children}
        </MyContext.Provider>
    )
}

export {Context, MyContext}