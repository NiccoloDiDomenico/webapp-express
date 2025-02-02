// import
const multer = require('multer');

// salvataggio del file
const storage = multer.diskStorage({
    // percorso file
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    // nome file
    filename: (req, file, cb) => {
        const uniqueFilename = `images/${file.originalname}-${Date.now()}`
        cb(null, uniqueFilename)
    }
});

// creo l'istanza di multer passandoglio storage
const publicUpload = multer({ storage });

module.exports = publicUpload;