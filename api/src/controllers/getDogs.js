const { Dog, Temperament } = require("../db");
const apiCall = require("./apiCall");

const getDogs = async (req, res, next) => {
	const { name } = req.query;

	try {
		const axiosDogs = await apiCall();

		const apiDogs = await Promise.all(
			axiosDogs.map(async dog => {
				if (dog.temperament) {
					const dogTemps = dog.temperament.split(", ");

					var temperaments = await Promise.all(
						dogTemps.map(
							async temp =>
								await Temperament.findOne({ where: { name: temp }, raw: true })
						)
					);
				}

				let dogWeight = dog.weight.metric;
				if (dogWeight === "NaN") dogWeight = "20 - 30";
				else if (dogWeight.includes("NaN")) dogWeight = "3 - 8";

				return {
					id: dog.id,
					name: dog.name,
					image: dog.image.url,
					weight: dogWeight,
					Temperaments: temperaments,
				};
			})
		);

		const dbDogs = await Dog.findAll({
			include: {
				model: Temperament,
				through: { attributes: [] },
			},
		});

		const allDogs = [...apiDogs, ...dbDogs];

		if (!name) return res.status(200).send(allDogs);

		const dogsName = [];

		allDogs.forEach(dog => {
			if (dog.name.toLowerCase().includes(name.toLowerCase())) {
				dogsName.push(dog);
			}
		});

		if (!dogsName.length) return res.send("Not found");
		return res.status(200).send(dogsName);
	} catch (error) {
		next(error);
	}
};

module.exports = getDogs;
