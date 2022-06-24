const express = require("express");
const routes = require("./routes");
const app = express();

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
