const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const bookSchema = new Schema({
    judulBuku: {
        type: String
    },
    penulisBuku: {
      type: String
    },
    penerbit: {
      type: String
    },
    tahunTerbit: {
      type: Number
    },
    sedia : {
      type: Boolean,
      default : true
    },
    idUser : {
      type: objectId,
      default : null
    },
})

module.exports = mongoose.model('book', bookSchema)