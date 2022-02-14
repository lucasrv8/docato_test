const Sequelize = require('sequelize');
const database = require('../infra/database');


const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 50]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
			notEmpty: true
		}
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 255]
        }
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [11,11],
        }
    },
})

module.exports = User;