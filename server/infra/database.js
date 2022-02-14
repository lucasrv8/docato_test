const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:pgsql@localhost:5432/test_docato', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;