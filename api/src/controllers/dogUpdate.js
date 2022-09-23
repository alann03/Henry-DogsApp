/* eslint-disable camelcase */
const { Dog } = require("../db");

const updateDog = async (req, res, next) => {
	const id = req.query.id;

	const {
		name,
		min_height,
		max_height,
		min_weight,
		max_weight,
		min_life_span,
		max_life_span,
		image,
		temperaments,
	} = req.body;
	console.log(name, temperaments);
	try {
		const updatedDog = await Dog.findByPk(id);
		if (updatedDog) {
			if (id.includes("-")) {
				const nameMayus = name[0].toUpperCase() + name.substring(1);
				const lifeSpan =
					min_life_span && max_life_span
						? `${min_life_span} - ${max_life_span} years`
						: min_life_span
						? `${min_life_span} years`
						: max_life_span
						? `${max_life_span} years`
						: "Unknown";
				const img = !image
					? "https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494_960_720.png"
					: image;

				await updatedDog.update({
					name: nameMayus,
					height: `${min_height} - ${max_height}`,
					weight: `${min_weight} - ${max_weight}`,
					life_span: lifeSpan,
					image: img,
				});
				await updatedDog.setTemperaments(temperaments.map(t => Number(t)));
				res.status(200).send(updatedDog);
			} else res.status(400).send("This dog cannot be updated");
		} else res.status(400).send("The dog does not exist");
	} catch (error) {
		next(error);
	}
};

module.exports = updateDog;
