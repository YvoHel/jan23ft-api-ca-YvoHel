module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define(
		'Category',
		{
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				unique: true // Ensure category names are unique
			},
		},
		{
			timestamps: false,
		}
	);

	Category.associate = function (models) {
		Category.belongsTo(models.User, { foreignKey: { allowNull: false } });
	};

	return Category;
};

