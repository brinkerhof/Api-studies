const Express = require("express");
const merda = Express();

merda.use(express.json());
merda.use(express.urlencoded());
