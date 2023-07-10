const router = require('express').Router()
const kunjunganController = require('../controllers/kunjunganController')


router.post('/create', (req, res) => {
    // req.body.buktiPembayaran = req.files.buktiPembayaran[0].filename

    kunjunganController.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
        
})


router.get('/getall', (req, res) => {

    kunjunganController.getall()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getbyiduser/:id', (req, res) => {

    kunjunganController.getByIdUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


module.exports = router