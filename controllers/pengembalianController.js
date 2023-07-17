const buku = require('../models/buku')
const peminjaman = require('../models/peminjaman')
const pengembalianModel = require('../models/pengembalian')
const mongoose = require('mongoose')
// const objectId = mongoose.Types.ObjectId

exports.create = (data) =>
    new Promise((resolve, reject) => {
        pengembalianModel.create(data)
            .then(() => {
                buku.updateOne({
                    _id: data.idBuku,
                }, {sedia: true})
                .then(() => {
                    buku.updateOne({
                        _id: data.idBuku,
                    }, {idUser: 1})
                    .then(() => {
                        peminjaman.updateOne({
                            _id: data.idPeminjaman,
                        }, {dipinjam: false})
                        .then(() => {
                            resolve({
                                sukses: true,
                                msg: 'Berhasil Transaksi'
                            })
                        }).catch(() => {
                            reject({
                                sukses: false,
                                msg: 'Gagal Transaksi pada proses update data buku'
                            })
                        })
                    }).catch(() => {
                        reject({
                            sukses: false,
                            msg: 'Gagal Transaksi pada proses update data buku'
                        })
                    })
                })
                    .catch(() => {
                        reject({
                            sukses: false,
                            msg: 'Gagal Transaksi pada proses pengembalian'
                        })
                    })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Transaksi pada proses pengembalian'
                })
            })
    })


exports.getall = () =>
    new Promise((resolve, reject) => {
        try {
            pengembalianModel.aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: 'idBuku',
                        foreignField: '_id',
                        as: 'dataBuku'
                    },
                    
                    
                },
                {
                    $unwind: '$dataBuku',
                    
                },

                {
                    $lookup: {
                    from: 'users',
                    localField: 'idUser',
                    foreignField: '_id',
                    as: 'dataUser'
                 }
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
