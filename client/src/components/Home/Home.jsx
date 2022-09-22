import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDogs,
	getTemperaments,
	filterByCreated,
	filterByTemperament,
	alphabeticalOrder,
	orderByWeight,
} from "../../actions";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import NavBar from "../NavBar/NavBar";
import Loader from "../Loader/Loader";
import Error404 from "../Error 404/Error404";
import s from "./Home.module.css";

export default function Home() {
	const dispatch = useDispatch();

	const allDogs = useSelector(state => state.dogs);
	const temperaments = useSelector(state => state.temperaments);

	const [order, setOrder] = useState("");

	// -----------------Paginated---------------------
	const [currentPage, setCurrentPage] = useState(1);
	const [dogsPerPage] = useState(8);
	const indexOfLastDog = currentPage * dogsPerPage;
	const indexOfFirstDog = indexOfLastDog - dogsPerPage;
	const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

	const paginated = pageNumber => {
		setCurrentPage(pageNumber);
	};
	// ----------------------------------------------

	useEffect(() => {
		dispatch(getTemperaments());
		dispatch(getDogs());
	}, [dispatch]);

	// -----------------Handles----------------------
	function handleClick(e) {
		e.preventDefault();
		dispatch(getDogs());
	}

	function handleSortName(e) {
		e.preventDefault();
		dispatch(alphabeticalOrder(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
	}

	function handleSortWeight(e) {
		e.preventDefault();
		dispatch(orderByWeight(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
	}

	function handleFilterCreated(e) {
		e.preventDefault();
		dispatch(filterByCreated(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
	}

	function handleFilterTemperaments(e) {
		e.preventDefault();
		dispatch(filterByTemperament(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
	}
	// ----------------------------------------------

	return (
		<div className={s.container}>
			<NavBar paginated={paginated} />
			<div className={s.filters}>
				<button
					className={s.refreshBtt}
					onClick={e => {
						handleClick(e);
					}}
				>
					Refresh
				</button>
				<select className={s.select} onChange={e => handleSortName(e)}>
					<option className={s.option} value="" disabled selected>
						Alphabetical order
					</option>
					<option className={s.option} value="asc">
						A-Z
					</option>
					<option className={s.option} value="desc">
						Z-A
					</option>
				</select>
				<select className={s.select} onChange={e => handleSortWeight(e)}>
					<option className={s.option} value="" disabled selected>
						Sort by weight
					</option>
					<option className={s.option} value="asc">
						Ascendente
					</option>
					<option className={s.option} value="desc">
						Descendente
					</option>
				</select>
				<select className={s.select} onChange={e => handleFilterCreated(e)}>
					<option className={s.option} value="" disabled selected>
						Filter by created
					</option>
					<option className={s.option} value="db">
						Created
					</option>
					<option className={s.option} value="api">
						Existing
					</option>
					<option className={s.option} value="all">
						All
					</option>
				</select>
				<select
					className={s.select}
					onChange={e => handleFilterTemperaments(e)}
				>
					<option className={s.option} value="" disabled selected>
						Filter by temperaments
					</option>
					{temperaments.map(temp => {
						return (
							<option className={s.option} key={temp.id} value={temp.name}>
								{temp.name}
							</option>
						);
					})}
					<option className={s.option} value="All">
						All
					</option>
				</select>
			</div>
			{allDogs === "Not found" ? (
				<Error404 text="Dogs not found :(" />
			) : allDogs.length ? (
				<div className={s.cardsAndPaginated}>
					<Pagination
						dogsPerPage={dogsPerPage}
						allDogs={allDogs.length}
						paginated={paginated}
						currentPage={currentPage}
					/>
					<Cards currentDogs={currentDogs} />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
