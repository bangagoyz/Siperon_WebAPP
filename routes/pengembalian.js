const router = require('express').Router()
const pengembalianController = require('../controllers/pengembalianController')

router.post('/create', (req, res) => {
    // req.body.buktiPembayaran = req.files.buktiPembayaran[0].filename

    pengembalianController.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getall', (req, res) => {

    pengembalianController.getall()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


module.exports = router