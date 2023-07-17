const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId
const moment = require('moment-timezone');
const dateJakarta = moment.tz(Date.now(), "Asia/Jakarta");


const kunjunganSchema = new Schema({
    idUser:{
        type:objectId
    },
    tanggal:{
      type:String,
    
    },
    status:{
    type:Number,
    default:0
},

})



module.exports = mongoose.model('kunjungan', kunjunganSchema)