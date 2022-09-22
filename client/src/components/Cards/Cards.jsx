import React from "react";
import DogCard from "../DogCard/Card";
import s from "./Cards.module.css";

export default function Cards({ currentDogs }) {
	return (
		<div className={s.container}>
			{currentDogs &&
				currentDogs.map(dog => {
					return (
						<DogCard
							key={dog.id}
							id={dog.id}
							name={dog.name}
							image={dog.image}
							weight={dog.weight}
							temperaments={dog.Temperaments}
						/>
					);
				})}
		</div>
	);
}
