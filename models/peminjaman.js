const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId
const moment = require('moment-timezone');
const dateJakarta = moment.tz(Date.now(), "Asia/Jakarta");


const peminjamanSchema = new Schema({
    idBuku:{
        type:objectId
    },
    idUser:{
        type:objectId
    },
    tanggal:{

        // type:Date,
        type:String,
    default: dateJakarta.toString(),
        // default: () => new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })

    },
    dipinjam:{
        type:Boolean,
        default: true
    },
    status:{
        type:Number,
        default:0
    },
    
    

})


module.exports=mongoose.model('peminjaman',peminjamanSchema)