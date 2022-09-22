import React from "react";
import { Link } from "react-router-dom";
import s from "./Error404.module.css";

export default function Error404({ text }) {
	if (!text) text = "Path not found :(";

	if (text === "Dogs not found :(")
		return (
			<div className={s.error404two}>
				<div className={s.container}>
					<div className={s.img}></div>
					<span className={s.text2}>{text}</span>
				</div>
			</div>
		);
	else
		return (
			<div className={s.error404}>
				<div className={s.container}>
					<div className={s.img}></div>
					<span className={s.text}>{text}</span>
				</div>
				<Link to="/home">
					<button className={s.btn}>Home</button>
				</Link>
			</div>
		);
}
