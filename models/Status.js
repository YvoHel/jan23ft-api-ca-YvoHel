module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        tableName: 'statuses'
    });

    return Status;
};

