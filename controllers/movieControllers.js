// Import
const connection = require('../data/movies_db');

// index
function index(req, res) {
    // prepara la query 
    const sql = 'SELECT * FROM movies';

    // esegue la query
    connection.query(sql, (err, results) => {
        // gestione errore
        if (err) return res.status(500).json({ error: 'Database query failed' })
        // gestione risposta
        res.json(results)
    });
};

//show
function show(req, res) {
    // recupeera l'id dall'URL
    const id = req.params.id

    // prepara la query per il film
    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    // prepara la query per la recensione
    const reviewsSql = `
        SELECT reviews.* 
        FROM movies
        JOIN reviews
        ON movies.id = reviews.movie_id
        WHERE movies.id = ?
    `

    // esegue la query per il film
    connection.query(movieSql, [id], (err, movieResults) => {
        // gestione errore
        if (err) return res.status(500).json({ error: 'Database query failed' });
        // gestione corrispondenza non trovato 
        if (movieResults.length === 0) return res.status(404).json({ error: 'Item not found' });
        // recupera il film
        const movie = movieResults[0];

        // se è andata bene, esegue la query per le reviews
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            // gestione errore
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiunge le reviews al film
            movie.reviews = reviewsResults;

            // gestione risposta
            res.json(movie);
        });
    });
};

// Exports
module.exports = {
    index,
    show
}