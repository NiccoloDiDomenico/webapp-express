// index
function index(req, res) {
    res.json({
        message: "Index di film"
    })
}

//show
function show(req, res) {
    res.json({
        message: "Show di film"
    })
}

// Exports
module.exports = {
    index,
    show
}