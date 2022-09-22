const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define(
		"Dog",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			height: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			weight: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			life_span: {
				type: DataTypes.STRING,
			},
			image: {
				type: DataTypes.STRING,
			},
			createdInDb: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
