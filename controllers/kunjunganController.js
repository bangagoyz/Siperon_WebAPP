const kunjunganModel = require('../models/kunjungan')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

exports.create = (data) =>
    new Promise((resolve, reject) => {
        kunjunganModel.create(data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Mengisi Buku Tamu'
                })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Mengisi Buku Tamu'
                })
            })
    })


exports.getall = () =>
    new Promise((resolve, reject) => {
        try {
            kunjunganModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'idUser',
                        foreignField: '_id',
                        as: 'dataUser'
                    },
                    
                    
                },
                {
                    $unwind: '$dataUser',
                    
                },

               
                
            ]).then((data) => {
                // console.log(data)
                resolve({
                    sukses: true,
                    msg: 'Berhasil',
                    data: data
                })
            }).catch((e) => {
                
                reject({
                    sukses: false,
                    msg: 'Gagal',
                    data: []
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

exports.getByIdUser = (id) =>
    new Promise((resolve, reject) => {
        try {
            kunjunganModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'idUser',
                        foreignField: '_id',
                        as: 'dataUser'
                    },
                    
                    
                },
                {
                    $unwind: '$dataUser',
                    
                },
                {
                    $match: {
                        idUser: objectId(id)
                    }
                },
                { $sort: { _id: -1 } }
            ]).then((data) => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil',
                    data: data
                })
            }).catch((e) => {
                reject({
                    sukses: false,
                    msg: 'Gagal',
                    data: []
                })
            })
        } catch (error) {
            console.log(error)
        }
    })


