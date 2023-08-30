import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import axios from "axios";

const MyContext = createContext();

const insert = (state, action) => {
    switch(action.type) {
        case "search" : return action.d;
        case "more" : return action.d;
        default : return action.d;
    }
}

function Context({children}) {

    const [data, dispatch] = useReducer(insert, []);
    const [num, setNum] = useState(1);


    const instance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {api_key: "f89a6c1f22aca3858a4ae7aef10de967"}
    });

    const fetchFn = async (type, data) => {

        let res;
        switch(type) {
            case "search" : 
            res = await instance.get(`/search/movie?query=${data}`);
            break;

            case "next" : 
            setNum(num+1);
            res = await instance.get(`/movie/popular?page=${num}`);
            break;

            case "before" : 
            setNum(num-1);
            res = await instance.get(`/movie/popular?page=${num}`);
            break;

            default : 
            res = await instance.get("/movie/popular");
        }
        if(num <= 1) {setNum(num+1)};
        dispatch({type, d: res.data.results});
    }

    useEffect(()=> {
        fetchFn()
    }, [])

    return (
        <MyContext.Provider value={{data, fetchFn, num}}>
            {children}
        </MyContext.Provider>
    )
}

export {Context, MyContext}