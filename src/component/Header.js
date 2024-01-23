import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { MyContext } from '../Context'
import styles from "../css/common.module.scss"

function Header() {
	const { navBttn } = useContext(MyContext);

	return (
		<nav>
			<Link className={`${navBttn == "main" ? styles.active : ""}`} to="/">홈</Link>
			<Link className={`${navBttn == "list" ? styles.active : ""}`} to="/movie">Movie</Link>
			<Link className={`${navBttn == "tv" ? styles.active : ""}`} to="/tv">TV</Link>
		</nav>
	)
}

export default Header