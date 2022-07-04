const config = require("../../../knexfile");

const knex = require("knex");

const connection = knex(coonfig.development);

module.exports = connection;
