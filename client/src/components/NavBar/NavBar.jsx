import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import s from "./NavBar.module.css";

export default function NavBar({ paginated }) {
	if (paginated)
		return (
			<div className={s.container}>
				<Link className={s.link} to="/">
					<div className={s.title}>
						<div className={s.text}>Dogs App</div>
						<div className={s.img} />
					</div>
				</Link>
				<SearchBar className={s.searchBar} paginated={paginated} />
				<Link to="/create-dog">
					<button className={s.btn}>Create dog</button>
				</Link>
			</div>
		);
	else
		return (
			<div className={s.container}>
				<Link className={s.link} to="/">
					<div className={s.title}>
						<div className={s.text}>Dogs App</div>
						<div className={s.img} />
					</div>
				</Link>
				<Link to="/home">
					<button className={s.btn}>Home</button>
				</Link>
			</div>
		);
}
