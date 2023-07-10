require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const mongoUrl = 'mongodb://127.0.0.1:27017/perpustakaan'
const mongoUrl = process.env.MONGO_URI
const cors = require('cors')
const path = require('path')
const  PORT = process.env.PORT || 5001


mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Berhasil Connect Ke Database')
}).catch((e) => {
    console.log(e)
    console.log('Gagal Connect Ke Database')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const directory = path.join(__dirname, '/static/')
app.use(express.static(directory))

app.use('/user', require('./routes/user'))
app.use('/buku', require('./routes/buku'))
app.use('/peminjaman', require('./routes/peminjaman'))
app.use('/kunjungan', require('./routes/kunjungan'))
app.use('/pengembalian', require('./routes/pengembalian'))

app.listen(PORT, () => {
    console.log('Berhasil Jalan')
})
