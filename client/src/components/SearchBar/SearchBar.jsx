import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../actions";
import s from "./SearchBar.module.css";

export default function SearchBar({ paginated }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	const clearInput = () => {
		document.getElementById("searchbar-input").value = "";
	};

	const handleChange = e => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(getDogsByName(name));
		clearInput();
		setName("");
		paginated(1);
	};

	return (
		<div>
			<form className={s.container} onSubmit={e => handleSubmit(e)}>
				<input
					id="searchbar-input"
					className={s.input}
					type="text"
					placeholder=" ..."
					onChange={e => handleChange(e)}
				/>
				<button className={s.btn} type="submit">
					Search
				</button>
			</form>
		</div>
	);
}
