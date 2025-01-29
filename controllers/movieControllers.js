// Import
const connection = require('../data/movies_db');

// index
function index(req, res) {
    // prepara la query 
    let sql = 'SELECT * FROM movies';

    // preleva i query params se ci sono
    const filter = req.query;
    let params = [];
    const conditions = [];

    // check per i query params: SEARCH se sono stati prelevati
    if (filter.search) {
        conditions.push(`title LIKE ?`);
        params.push(`%${filter.search}%`);
    };

    // check per i query params: GENRE se sono stati prelevati
    if (filter.genre) {
        conditions.push(`genre = ?`)
        params.push(`${filter.genre}`);
    };

    // check per i query params: release_year se sono stati prelevati
    if (filter.release_year) {
        conditions.push(`release_year = ?`)
        params.push(`${filter.release_year}`);
    };

    // aggiorna la query se sono stati prelevati i query params
    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
    };

    // Query Buldier
    // for (const key in req.query) {
    //         conditions.push(`${key} = ?`);
    //         params.push(req.query[key]);
    // };

    // esegue la query
    connection.query(sql, params, (err, results) => {
        // gestione errore 
        if (err)
            return res.status(500).json({ error: 'Database query failed' })
        // gestione risposta
        res.json(results)
    });
};

//show
function show(req, res) {
    // recupeera l'id dall'URL
    const slug = req.params.slug

    // prepara la query per il film
    const movieSql = `
        SELECT movies.*, CAST(AVG(reviews.vote) AS FLOAT) AS vote_avg
        FROM movies
        LEFT JOIN reviews
        ON movies.id = reviews.movie_id
        WHERE movies.slug = ?
    `

    // prepara la query per la recensione
    const reviewsSql = `
        SELECT reviews.*
        FROM movies
        JOIN reviews
        ON movies.id = reviews.movie_id
        WHERE movies.slug = ?
    `

    // esegue la query per il film
    connection.query(movieSql, [slug], (err, movieResults) => {
        // gestione errore
        if (err)
            return res.status(500).json({ error: 'Database query failed' });
        // gestione corrispondenza non trovato 
        if (movieResults.length === 0 || movieResults[0].id === null)
            return res.status(404).json({ error: 'Item not found' });
        // recupera il film
        const movie = movieResults[0];

        // se è andata bene, esegue la query per le reviews
        connection.query(reviewsSql, [slug], (err, reviewsResults) => {
            // gestione errore
            if (err)
                return res.status(500).json({ error: 'Database query failed' });
            // aggiunge le reviews al film
            movie.reviews = reviewsResults;
            // gestione risposta
            res.json(movie);
        });
    });
};

// Store
function storeReview(req, res) {
    // recupera i dati dalla richiesta
    const id = req.params.id
    const { name, vote, text } = req.body

    // preparo la query che verifica se il film esiste
    const movieSql = `
        SELECT * 
        FROM reviewss
        WHERE id = ?
    `
    // preparo la query che aggiunge dei nuovi elementi alla tabella 
    const reviewSql = `
        INSERT INTO reviews(movie_id, name, vote, text)
        VALUES (?,?,?,?)
    `

    // esegue la query per verificare se il film esiste
    connection.query(movieSql, [id], (err, movieResults) => {
        // gestione errore 
        if (err)
            return res.status(500).json({ error: 'Database query failed' });
        // gestione corrispondenza non trovato 
        if (movieResults.length === 0 || movieResults[0].id === null)
            return res.status(404).json({ error: 'Item not found' });

        // se è andata bene, esegue la query per le reviews
        connection.query(reviewSql, [id, name, vote, text], (err, reviewsResults) => {
            // gestione errore
            if (err)
                return res.status(500).json({ error: 'Database query failed' });
            // gestione corrispondenza non trovato 
            if (reviewsResults.length === 0 || movieResults[0].id === null)
                return res.status(404).json({ error: 'Item not found' });
            // gestione risposta
            res.status(201).json({ message: "Recensione aggiunta" })
            console.log(results);
        });
    });
};

// Exports
module.exports = {
    index,
    show,
    storeReview
}