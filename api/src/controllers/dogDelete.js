const { Dog } = require("../db");

const deleteDogs = (req, res) => {
	const id = req.query.id;

	if (id.includes("-")) {
		Dog.destroy({ where: { id } });

		res.status(200).send("Dog deleted");
	}
	res.status(400).send("This dog cannot be deleted");
};

module.exports = deleteDogs;
