var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");



var Fact = sequelizeConnection.define("facts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fact: {
        type: Sequelize.STRING,
    },
    category_id: {
        type: Sequelize.STRING,
    }
});

// mysql

Fact.sync();
console.log(Fact)
module.exports = Fact;
