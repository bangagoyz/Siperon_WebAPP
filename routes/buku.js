const router = require('express').Router()
const bukuController = require('../controllers/bukuController')
// const uploadConfig = require('../uploadConfig')
// // const fields = uploadConfig.upload.fields([
// //   {
// //     name: 'gambar',
// //     maxCount: 1
// //   }
// // ])

router.post('/create', (req, res) => {
  // req.body.gambar = req.files.gambar[0].filename
  // console.log(req.body)
  bukuController.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.put('/edit/:id',(req, res) => {
  let data = req.body
  // console.log(data)
  bukuController.edit(req.params.id, data)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


router.get('/getall', (req, res) => {
  bukuController.getData()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getbyid/:id', (req, res) => {
  console.log(req.params.id)
  bukuController.getById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/hapus/:id', (req, res) => {
  bukuController.delete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getbukutersedia', (req, res) => {
  bukuController.getbukutersedia()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


router.get('/getbukuadmin', (req, res) => {
  bukuController.getbukuadmin()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router