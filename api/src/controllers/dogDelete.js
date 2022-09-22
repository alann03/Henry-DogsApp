const { Dog } = require("../db");

const deleteDogs = async (req, res, next) => {
	const id = req.query.id;

	try {
		if (await Dog.findByPk(id)) {
			if (id.includes("-")) {
				await Dog.destroy({ where: { id } });
				res.status(200).send("Dog deleted");
			} else res.status(400).send("This dog cannot be deleted");
		} else res.status(400).send("The dog does not exist");
	} catch (error) {
		next(error);
	}
};

module.exports = deleteDogs;
