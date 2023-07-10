const jwt= require('jsonwebtoken')


class UserService{
static async generateToken(tokenData,secretKey,jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire});
    }
}


module.exports = UserService;