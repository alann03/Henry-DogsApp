import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetail, getDetail, getTemperaments } from "../../actions";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import Error404 from "../Error 404/Error404";
import s from "./Detail.module.css";

export default function Detail() {
	const dispatch = useDispatch();

	const dogDetail = useSelector(state => state.detail);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
		dispatch(getTemperaments());
		return () => dispatch(clearDetail());
	}, [dispatch, id]);

	if (dogDetail === "Not found") return <Error404 text="Dog not found :(" />;
	else
		return (
			<div className={s.container}>
				<NavBar />
				{Object.keys(dogDetail).length ? (
					<div className={s.cardDetail}>
						<span className={s.name}>{dogDetail.name}</span>
						<img className={s.img} src={dogDetail.image} alt="Not found" />
						<div className={s.statsContainer}>
							<div className={s.stat}>
								<span className={s.statName}>Weight</span>
								<span className={s.statValue}>{dogDetail.weight} kg</span>
							</div>
							<div className={s.stat}>
								<span className={s.statName}>Height</span>
								<span className={s.statValue}>{dogDetail.height} cm</span>
							</div>
							<div className={s.stat}>
								<span className={s.statName}>Life Span</span>
								<span className={s.statValue}>{dogDetail.life_span}</span>
							</div>
						</div>
						<div className={s.tempsContainer}>
							<span className={s.statName}>Temperaments</span>
							{dogDetail.Temperaments ? (
								<span className={s.statValue}>
									{dogDetail.Temperaments.map(e => {
										return e.name + " ";
									})}
								</span>
							) : (
								<span className={s.statValue}>Temperaments not found</span>
							)}
						</div>
					</div>
				) : (
					<Loader />
				)}
			</div>
		);
}
