const cryptp=require("crypto")

//gen random key
const secretKey=cryptp.randomBytes(32).toString('hex');

module.exports={
    secretKey:secretKey
}