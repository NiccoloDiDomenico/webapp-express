// Import
const express = require('express');
const moviesRouters = require('./routers/moviesRouters');
const errorsHandler = require('./middlewares/errorsHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const cors = require('cors');

// Creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;

// Cors
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

// Middleware per rendere la cartella public accessibile da fuori
app.use(express.static('public'));

// Middleware che fa il parse json
app.use(express.json());

// Definisco le rotte
app.use("/movies", moviesRouters);

// Registro errorsHandler middleware
app.use(errorsHandler);

// Registro notFoundHandler middleware
app.use(notFoundHandler);

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
});