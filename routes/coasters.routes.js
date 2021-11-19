const router = require("express").Router();
const Coaster = require("../models/Coaster.model")
const Park = require("../models/Park.model")
// Endpoints

router.get("/crear", (req, res, next) => {//
    Park.find()
        .then(allParks => res.render("coasters/new-coaster", { allParks }))
        .catch(err => console.log(err))
});


router.post("/crear", (req, res, next) => {

    const { title, description, inversions, length, active, park_id } = req.body
    Coaster.create({ title, description, inversions, length, active })
        .then(createdCoaster => res.redirect("/"))
        .catch(err => console.log(err))
});


router.get("/", (req, res, next) => {//
    Coaster.find()
        .populate('park_id')
        .then(allCoasters => res.render("coasters/coaster-index", { allCoasters }))
        .catch(err => console.log(err))
});



router.get("/:id", (req, res, next) => {
    const coasterid = req.params.id
    Coaster.findById(coasterid)
        .populate('park_id')
        .then(allCoasters => {
            console.log(allCoasters)
            res.render("coasters/coaster-details", allCoasters)
        })
        .catch(err => console.log(err))
});

///BORRARRRR
router.get('/delete/:id', (req, res) => {
    console.log('Esto es el req.query:', req.params.id)
    const coaster_id = req.params.id
    Coaster
        .findByIdAndRemove(coaster_id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})



//EDITARRRR
router.get('/edit', (req, res, next) => {
    const { id } = req.query
    const allParks = Park.find()
    const coaster = Coaster.findById(id).populate('park_id')
    Promise.all([allParks, coaster])
        .then((data) => {
            const [allParks, coaster] = data
            res.render('coasters/edit-coaster', { allParks, coaster })
        })
        .catch((err) => console.error(err))
})

router.post('/editar', (req, res, next) => {
    const { id } = req.query
    Coaster.findByIdAndUpdate(id, req.body, { new: true })
        .then(() => res.redirect('/coasters'))
        .catch((err) => console.error(err))
})








router.post("/editar/:id", (req, res) => {
    const { id } = req.params
    const { name, type } = req.body

    Place.findByIdAndUpdate(id, { name, type }, { new: true })
        .then(place => res.redirect(`/places${place._id}`))
        .catch(err => console.log(err))
})
module.exports = router;