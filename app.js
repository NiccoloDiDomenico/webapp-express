// Import
const express = require('express');
const moviesRouters = require('./routers/moviesRouters');

// Creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;

// Definisco le rotte
app.use("/movies", moviesRouters);

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});