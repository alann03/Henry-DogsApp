import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { clearDetail, getDetail, getTemperaments } from "../../actions";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import Error404 from "../Error 404/Error404";
import s from "./Detail.module.css";

export default function Detail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const dogDetail = useSelector(state => state.detail);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
		dispatch(getTemperaments());
		return () => dispatch(clearDetail());
	}, [dispatch, id]);

	const handleDelete = async (e) => {
		e.preventDefault();
		if (confirm("Are you sure?")) {
			await axios.delete(`/dogs?id=${id}`);
			history.push("/home");
		}
	};

	if (dogDetail === "Not found") return <Error404 text="Dog not found :(" />;
	else
		return (
			<div className={s.container}>
				<NavBar />
				{Object.keys(dogDetail).length ? (
					<div className={s.containerCardAndBtns}>
						{id.includes("-") ? (
							<button className={s.btnDelete} onClick={e => handleDelete(e)}>Delete</button>
						) : null}
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
						{id.includes("-") ? (
							<Link to={`/update-dog/${id}`}>
								<button className={s.btnUpdate}>Update</button>
							</Link>
						) : null}
					</div>
				) : (
					<Loader />
				)}
			</div>
		);
}
