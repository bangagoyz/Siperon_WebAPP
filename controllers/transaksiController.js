const buku = require('../models/buku')
const peminjamanModel = require('../models/peminjaman')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

exports.create = (data) =>
    new Promise((resolve, reject) => {
        peminjamanModel.create(data)
            .then(() => {
                buku.updateOne({
                    _id: data.idBuku,
                }, {sedia: false})
                .then(() => {
                    buku.updateOne({
                        _id: data.idBuku,
                    }, {idUser: data.idUser})
               
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
                        msg: 'Gagal Transaksi pada proses peminjaman'
                    })
                })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Transaksi pada proses peminjaman'
                })
            })
    })

exports.uploadBuktiBayar = (id, data) =>
    new Promise((resolve, reject) => {
        peminjamanModel.updateOne({ _id: id }, data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Transaksi'
                })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Transaksi'
                })
            })
    })

exports.getall = () =>
    new Promise((resolve, reject) => {
        try {
            peminjamanModel.aggregate([
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

exports.getByIdUser = (id) =>
    new Promise((resolve, reject) => {
        try {
            peminjamanModel.aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: 'idBuku',
                        foreignField: '_id',
                        as: 'dataBuku'
                    }
                },
                {
                    $unwind: '$dataBuku'
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

exports.
getByIdUserLimit = (id, limit) =>
    new Promise((resolve, reject) => {
        try {
            peminjamanModel.aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: 'idBuku',
                        foreignField: '_id',
                        as: 'dataBuku'
                    }
                },
                {
                    $unwind: '$dataBuku'
                },
                {
                    $match: {
                        idUser: objectId(id)
                    }
                },
                { $sort: { _id: -1 } },
                {
                    $limit: 3,
                },

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


    exports.limitgetall = () =>
    new Promise((resolve, reject) => {
        try {
            peminjamanModel.aggregate([
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
                {
                    $limit: 3,
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



exports.edit = (id, data) =>
new Promise((resolve, reject) => {
    peminjamanModel.updateOne({ _id: id }, { $set: data })
        .then(() => {
            resolve({
                sukses: true,
                msg: 'Berhasil Transaksi'
            })
        }).catch(() => {
            reject({
                sukses: false,
                msg: 'Gagal Transaksi'
            })
        })
})