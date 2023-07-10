const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const UserService = require('../userServices/userService')
const util = require('util');

exports.register = (data) => 
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then(user => {
            if (user) {
                reject({
                    sukses: false,
                    msg: 'Username Telah Terdaftar'
                })
            } else {
                bcrypt.hash(data.password, 10, (err, hash) => {
                    data.password = hash
                    userModel.create(data)
                    .then(() => resolve({
                        sukses: true,
                        msg: 'Berhasil Registrasi'
                    })).catch(() => reject({
                        sukses: false,
                        msg: 'Gagal Registrasi'
                    }))
                })
            }
        })
    })

    exports.login = (data) =>
  userModel.findOne({ username: data.username }).then(async (user) => {
    if (user) {
      if (bcrypt.compareSync(data.password, user.password)) {
        try {
          let tokenData = { _id: user._id, username: user.username };
          const token = await UserService.generateToken(
            tokenData,
            "secretKey",
            "1h"
          );

          return {
            sukses: true,
            msg: "Berhasil Login",
            data: user,
            token: token,
          };
        } catch (err) {
          throw {
            sukses: false,
            msg: err.message,
          };
        }
      } else {
        throw {
          sukses: false,
          msg: "Password Anda Salah",
        };
      }
    } else {
      throw {
        sukses: false,
        msg: "Username Tidak Terdaftar",
      };
    }
  });

// exports.login = (data) =>
//     new Promise((resolve, reject) => {
//         userModel.findOne({
//             username: data.username
//         }).then(user => {
//             if (user) {
//                 if (bcrypt.compareSync(data.password, user.password)) {

//                     let tokenData = {_id:user._id,username:user.username}
//                     const token = UserService.generateToken(tokenData, "secretKey", "1h")
//                     resolve({
                        
//                         sukses: true,
//                         msg: 'Berhasil Login',
//                         data: user,
//                         token: JSON.stringify(token)
                        
//                     })
//                 } else {
//                     reject({
//                         sukses: false,
//                         msg: 'Password Anda Salah'
//                     })
//                 }
//             } else {
//                 reject({
//                     sukses: false,
//                     msg: 'Username Tidak Terdaftar'
//                 })
//             }
//         })
//     })
