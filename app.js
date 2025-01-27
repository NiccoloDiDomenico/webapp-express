// Import
const express = require('express');
const moviesRouters = require('./routers/moviesRouters');
const errorsHandler = require('./middlewares/errorsHandler');

// Creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;

// Rendo la cartella public accessibile da fuori
app.use(express.static('public'));

// Definisco le rotte
app.use("/movies", moviesRouters);

// Registro errorsHandler middleware
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});