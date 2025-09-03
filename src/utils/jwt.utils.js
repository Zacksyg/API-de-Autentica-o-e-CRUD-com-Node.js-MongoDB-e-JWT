const jwt = require('jsonwebtoken');

function generateAcessToken(userId){
    return jwt.sign({ sub: userId }, process.env.JWT_ACESS_SECRET, {
        expiresIn: process.env.JWT_ACESS_EXPIRES_IN,
    });
}

function generateRefreshToken(userId){
    return jwt.sign({ sub: userId}, process.env.JWT_REFRESH_SECRET,{
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
}

module.exports = {
    generateAcessToken,
    generateRefreshToken,
};