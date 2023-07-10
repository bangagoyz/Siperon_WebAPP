const router = require('express').Router()
const transaksiController = require('../controllers/transaksiController')
const uploadConfig = require('../uploadConfig')
const fields = uploadConfig.upload.fields([
    {
        name: 'persetujuan',
        maxCount: 1
    }
])

router.post('/create', (req, res) => {
    // req.body.buktiPembayaran = req.files.buktiPembayaran[0].filename

    transaksiController.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
        
})

router.put('/upload-bukti/:id', fields, (req, res) => {
    const data = req.body
    // req.body.persetujuan = req.files.persetujuan[0].filename

    transaksiController.uploadBuktiBayar(req.params.id, data)
    // transaksiController.uploadBuktiBayar(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getall', (req, res) => {

    transaksiController.getall()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/limitgetall', (req, res) => {

    transaksiController.limitgetall()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getbyiduser/:id', (req, res) => {

    transaksiController.getByIdUser(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getbyiduserlimit/:id', (req, res) => {

    transaksiController.getByIdUserLimit(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.put('/edit/:id', fields, (req, res) => {
    let data = req.body
    console.log(data)
    transaksiController.edit(req.params.id, data)
      .then(result => res.json(result))
      .catch(err => res.json(err))
  })

module.exports = router