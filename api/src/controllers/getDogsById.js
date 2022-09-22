const { Dog, Temperament } = require("../db");
const apiCall = require("./apiCall");

const getById = async (req, res, next) => {
	const { id } = req.params;

	try {
		if (id.length === 36) {
			const idDog = await Dog.findOne({
				where: { id },
				include: {
					model: Temperament,
					through: { attributes: [] },
				},
			});

			if (!idDog) return res.send("Not found");
			return res.status(200).send(idDog);
		} else {
			const axiosDogs = await apiCall();

			const idDog = axiosDogs.find(dog => dog.id === Number(id));

			if (!idDog) return res.send("Not found");

			if (idDog.temperament) {
				const dogTemps = idDog.temperament.split(", ");

				var temperaments = await Promise.all(
					dogTemps.map(
						async temp =>
							await Temperament.findOne({ where: { name: temp }, raw: true })
					)
				);
			}

			let dogWeight = idDog.weight.metric;
			if (dogWeight === "NaN") dogWeight = "20 - 30";
			else if (dogWeight.includes("NaN")) dogWeight = "3 - 8";

			return res.status(200).send({
				id: idDog.id,
				name: idDog.name,
				height: idDog.height.metric,
				weight: dogWeight,
				life_span: idDog.life_span,
				image: idDog.image.url,
				Temperaments: temperaments,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = getById;
