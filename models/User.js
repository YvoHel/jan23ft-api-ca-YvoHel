module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        encryptedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
       
    }, {
        timestamps: true, 
        tableName: 'users'
    });

    User.associate = function(models) {
        User.hasMany(models.Todo, { foreignKey: { allowNull: false } });
    };

    return User;
};

