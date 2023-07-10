const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId
const moment = require('moment-timezone');
const dateJakarta = moment.tz(Date.now(), "Asia/Jakarta");


const pengembalianSchema = new Schema({
    idBuku:{
        type:objectId
    },
    idUser:{
        type:objectId
    },
    idPeminjaman:{
        type:objectId
    },
    tanggal:{
        // type:Date,
        type:String,
    default: dateJakarta.toString(),
        // default: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })

    },
    status:{
        type:Number,
        default:0
    },
    persetujuan:{
        type:String
    }

})


module.exports=mongoose.model('pengembalian',pengembalianSchema)