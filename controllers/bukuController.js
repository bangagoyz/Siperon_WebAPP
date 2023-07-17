const bukuModel = require('../models/buku')

exports.create = (data) =>
  new Promise((resolve, reject) => {
    bukuModel.create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: 'Berhasil Menyimpan Data'
        })
      }).catch((e) => {
        console.log(e)
        reject({
          sukses: false,
          msg: 'Gagal Menyimpan Data'
        })
      })
  })

exports.getData = () =>
  new Promise((resolve, reject) => {
    bukuModel.find({})
      .then(res => {
        resolve({
          sukses: true,
          msg: 'Berhasil Mengambil Data',
          data: res
        })
      }).catch(() => reject({
        sukses: false,
        msg: 'Gagal Mengmabil Data',
        data: []
      }))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    bukuModel.findOne({
      _id: id
    })
      .then(res => {
        resolve({
          sukses: true,
          msg: 'Berhasil Mengambil Data',
          data: res
        })
      }).catch(() => reject({
        sukses: false,
        msg: 'Gagal Mengmabil Data',
        data: {}
      }))
  })

  exports.edit = (id, data) =>
    new Promise((resolve, reject) => {
      bukuModel.updateOne({
        _id: id
      }, data).then(() => resolve({
        sukses: true,
        msg: 'Berhasil Edit Data'
      })).catch(() => reject({
        sukses: false,
        msg: 'Gagal Edit Data'
      }))
    })


exports.delete = (id) =>
  new Promise((resolve, reject) => {
    bukuModel.deleteOne({
      _id: id
    }).then(() => resolve({
      sukses: true,
      msg: 'Berhasil Hapus Data'
    })).catch(() => reject({
      sukses: false,
      msg: 'Gagal Hapus Data'
    }))
  })


exports.getbukutersedia = () =>
  new Promise((resolve, reject) => {
    bukuModel.find({ sedia: true })
      .then(res => {
        resolve({
          sukses: true,
          msg: 'Berhasil Mengambil Data',
          data: res
        })
      }).catch(() => reject({
        sukses: false,
        msg: 'Gagal Mengmabil Data',
        data: []
      }))
  })


exports.getbukuadmin = () =>
  new Promise((resolve, reject) => {
      try {
          bukuModel.aggregate([
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

