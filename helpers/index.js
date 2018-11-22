var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function encrypt(password){
    return bcrypt.hashSync(password, salt)
}
function compareHash(password,hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encrypt: encrypt,
    compareHash: compareHash
}