module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
    }, {
        tableName: 'users',
        engine: 'InnoDB',
        indexes: [
            {
                unique: true,
                fields: ['email', 'role']
            }
        ]
    });

    return users;
};
