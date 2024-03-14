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
    const [sData, setSData] = useState([]);
    const [media, setMedia] = useState("movie");
    const [cat, setCat] = useState("popular");
    const [num, setNum] = useState(1);
    const [sNum, setSSnum] = useState(1);
    const [sec, setSec] = useState([]);
    const [navBttn, setNavBttn] = useState("");
    const [navSc, setNavSc] = useState("up");
    const [sInp, setSInp] = useState("");
    const [sDet, setSDet] = useState([]);

    const instance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {api_key: "f89a6c1f22aca3858a4ae7aef10de967"}
    });

    const a = [1, 2, 3, 4, 5];
    const b = [
        {
            test1: 1,
            test2: 2,
            test3: 3
        },
        {				
            test1: 1,
            test2: 2,
            test3: 3
        },
        {				
            test1: 1,
            test2: 2,
            test3: 3
        }
		];

		const dTest = () => {
			const c = a.filter(item=>{
				return b.some(obj => obj.test2 == item);
			})
			console.log(c);
		}

		useEffect(()=>{
			dTest();
		}, [])

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
            res = await instance.get(`/search/${media}?query=${sInp}&page=${sNum}`);
            res = res.data.results;
            setSData(res);
            break;

            case "get" :
            res = await instance.get(`/${media}/${cat}?page=${num}`);
            res = res.data.results;
            dispatch({type, d: res});
            break;

            case "more" :
            res = await instance.get(`/${media}/${cat}?page=${data}`);
            res = res.data.results;
            dispatch({type, d: res});
            break;
    
            default :
            res = await instance.get(`/${media}/${cat}?page=${num}`);
            res = res.data.results;
            dispatch({type, d: res});
            };
    };

    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY == 0) {
            setNavSc("up");
        } else {
            setNavSc("down");
        }
    }

    useEffect(()=> {
        forMain();
        fetchFn();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(()=>{
        fetchFn();
    }, [num, media, cat]);

    useEffect(()=>{
        fetchFn("search", "");
    }, [sNum, sDet])

    return (
        <MyContext.Provider value={{data, fetchFn, num, setNum, cat, setCat, media, setMedia, sec, setSec, navBttn, setNavBttn, navSc, sNum, setSSnum, sInp, setSInp, sData, setSData, setSDet}}>
            {children}
        </MyContext.Provider>
    )
}

export {Context, MyContext}