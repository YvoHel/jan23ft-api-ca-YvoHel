module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true,  
        tableName: 'todos'
    });

    Todo.associate = function(models) {
        Todo.belongsTo(models.Category, { foreignKey: { allowNull: false } });
        Todo.belongsTo(models.Status, { foreignKey: { allowNull: false } });
    };

    return Todo;
};

