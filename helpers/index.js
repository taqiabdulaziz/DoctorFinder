var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function encrypt(password){
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    encrypt: encrypt
}