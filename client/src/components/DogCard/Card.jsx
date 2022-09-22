import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

export default function DogCard({ id, name, image, weight, temperaments }) {

	return (
		<div className={s.container}>
			<span className={s.name}>{name}</span>
			<img className={s.img} src={image} alt="Not found" />
			<div className={s.weightContainer}>
				<span className={s.weightName}>Weight:</span>
				<span className={s.weightValue}>{weight} kg</span>
			</div>
			<div className={s.tempsContainer}>
				<span className={s.tempsName}>Temperaments:</span>
				{temperaments ? (
					<span className={s.tempsValue}>
						{temperaments.map(e => {
							return e.name + " ";
						})}
					</span>
				) : (
					<span className={s.tempsValue}>Temperaments not found</span>
				)}
			</div>
			<Link to={`/home/${id}`}>
				<button className={s.btn}>!</button>
			</Link>
		</div>
	);
}
