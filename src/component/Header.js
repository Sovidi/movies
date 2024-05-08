import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { MyContext } from '../Context'
import styles from "../css/common.module.scss"

function Header() {
	const { navBttn, navSc, media } = useContext(MyContext);

	return (
		<nav className={navSc == "up" ? styles.active : ""}>
			<Link className={`${navBttn == "main" ? styles.active : ""}`} to="/">홈</Link>
			<Link className={`${navBttn == "list" ? styles.active : ""} ${navBttn == "movie" ? styles.active : ""}`} to="/list/movie">Movie</Link>
			<Link className={`${navBttn == "tv" ? styles.active : ""}`} to="/tv/tv">TV</Link>
		</nav>
	)
}

export default Header