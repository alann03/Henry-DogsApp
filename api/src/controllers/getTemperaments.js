const { Temperament } = require("../db");
const apiCall = require("./apiCall");

const getTemperaments = async (req, res, next) => {
	try {
		let allTemperaments = await Temperament.findAll();

		if (!allTemperaments.length) {
			const axiosDogs = await apiCall();

			const temperaments = axiosDogs
				.map(dog => dog.temperament)
				.join(", ")
				.split(", ")
				.filter(temp => temp);

			temperaments.forEach(async temp => {
				await Temperament.findOrCreate({
					where: { name: temp },
				});
			});

			allTemperaments = await Temperament.findAll();
		}

		return res.status(200).send(allTemperaments);
	} catch (error) {
		next(error);
	}
};

module.exports = getTemperaments;
