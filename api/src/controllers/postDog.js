/* eslint-disable camelcase */
const { Dog } = require("../db");

const postDogs = async (req, res, next) => {
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

	try {
		if (await Dog.findOne({ where: { name } }))
			return res.status(404).send("Ya existe un perro con ese nombre.");

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

		console.log({
			name: nameMayus,
			height: `${min_height} - ${max_height}`,
			weight: `${min_weight} - ${max_weight}`,
			life_span: lifeSpan,
			image: img,
		});

		const newDog = await Dog.create({
			name: nameMayus,
			height: `${min_height} - ${max_height}`,
			weight: `${min_weight} - ${max_weight}`,
			life_span: lifeSpan,
			image: img,
		});

		await newDog.addTemperaments(temperaments);

		return res.status(200).send("Dog created.");
	} catch (error) {
		next(error);
	}
};

module.exports = postDogs;
