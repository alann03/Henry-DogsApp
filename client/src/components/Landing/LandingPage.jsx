import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments } from "../../actions";
import s from "./LandingPage.module.css";

export default function LandingPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	return (
		<div className={s.container}>
			<div className={s.title}>
				<div className={s.text}>Welcome to the Dogs App</div>
				<div className={s.img} />
			</div>
			<Link to="/home">
				<button className={s.btn}>Home</button>
			</Link>
		</div>
	);
}
