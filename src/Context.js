import React, { useEffect, useReducer, useState } from 'react'
import { createContext } from 'react'
import axios from "axios";

const MyContext = createContext();


const insert = (state, action) => {
    switch(action.type) {
        case "search" : return action.d;
        case "more" : return [...state, action.d];
    default :
        return action.d;
    }
}


function Context({children}) {

    const [data, dispatch] = useReducer(insert, []);

    let num = 0;
    const fetchFn = (type, data) => {
        num++;
        const instance = axios.create({
            baseURL: "https://api.themoviedb.org/3",
            params: {
                page: `${num}`,
                api_key: "f89a6c1f22aca3858a4ae7aef10de967"
            }
        });
    
        const search = axios.create({
            baseURL: "https://api.themoviedb.org/3",
            params: {
                query: `${data}`,
                api_key: "f89a6c1f22aca3858a4ae7aef10de967"
            }
        });
        
        const dataWay = async (type, data) => {
            let res;
            switch(type) {
                case "search" : 
                res = await search.get("/search/movie");
                break;

                case "more" : 
                res = await instance.post("/movie/popular");
                break;

                default : 
                res = await instance.get("/movie/popular");
            }
            dispatch({type, d: res.data.results});
        };
        
        dataWay(type, data);
    }



    useEffect(()=> {
        fetchFn()
    }, [])



    return (
        <MyContext.Provider value={{data, fetchFn}}>
            {children}
        </MyContext.Provider>
    )
}

export {Context, MyContext}