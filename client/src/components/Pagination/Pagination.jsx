import React from "react";
import s from "./Pagination.module.css";

export default function Pagination({
	dogsPerPage,
	allDogs,
	paginated,
	currentPage,
}) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={s.container}>
			<button
				className={s.btt}
				onClick={() =>
					paginated(currentPage === 1 ? currentPage : currentPage - 1)
				}
			>
				«
			</button>
			{pageNumbers &&
				pageNumbers.map(number => (
					<button
						className={s.btt}
						key={number}
						onClick={() => paginated(number)}
					>
						{currentPage === number ? <b>{number}</b> : number}
					</button>
				))}
			<button
				className={s.btt}
				onClick={() =>
					paginated(
						currentPage === pageNumbers.length
							? pageNumbers.length
							: currentPage + 1,
					)
				}
			>
				»
			</button>
		</div>
	);
}
