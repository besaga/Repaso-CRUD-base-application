const router = require("express").Router();
const Park = require("../models/Park.model")

// Endpoints




router.get("/crear", (req, res, next) => {//
    res.render("parks/new-park");
});


router.post("/crear", (req, res, next) => {

    const { name, description } = req.body
    Park.create({ name, description })
        .then(createdPartk => res.redirect("/"))
        .catch(err => console.log(err))
});








module.exports = router;