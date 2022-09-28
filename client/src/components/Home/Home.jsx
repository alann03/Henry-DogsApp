import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDogs,
	getTemperaments,
	filterByCreated,
	filterByTemperament,
	sort,
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
		document.querySelector("#sortSelect").value = "";
		document.querySelector("#tempFilter").value = "";
		document.querySelector("#originFilter").value = "";
	}

	function handleSort(e) {
		e.preventDefault();
		dispatch(sort(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
	}

	function handleFilterCreated(e) {
		e.preventDefault();
		dispatch(filterByCreated(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
		document.querySelector("#sortSelect").value = "";
		document.querySelector("#tempFilter").value = "";
	}

	function handleFilterTemperaments(e) {
		e.preventDefault();
		dispatch(filterByTemperament(e.target.value));
		setCurrentPage(1);
		setOrder(`${e.target.value}`);
		document.querySelector("#sortSelect").value = "";
		document.querySelector("#originFilter").value = "";
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
					Reset
				</button>
				<select
					id="tempFilter"
					className={s.select}
					onChange={e => handleFilterTemperaments(e)}
				>
					<option className={s.option} value="" disabled selected>
						Filter by temperament
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
				<select id="originFilter" className={s.select} onChange={e => handleFilterCreated(e)}>
					<option className={s.option} value="" disabled selected>
						Filter by origin
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
				<select id="sortSelect" className={s.select} onChange={e => handleSort(e)}>
					<option className={s.option} value="" disabled selected>
						Sort
					</option>
					<option className={s.option} value="alphAsc">
						A-Z
					</option>
					<option className={s.option} value="alphDesc">
						Z-A
					</option>
					<option className={s.option} value="weightAsc">
						Weight -asc-
					</option>
					<option className={s.option} value="weightDesc">
						Weight -desc-
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
