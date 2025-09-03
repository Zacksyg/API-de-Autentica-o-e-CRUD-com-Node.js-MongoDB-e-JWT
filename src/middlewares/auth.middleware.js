const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_ACESS_SECRET);
            req.user = {id: decoded.sub};
            next();

        } else{   
            console.log(token)       
            return res.status(401).json({message: 'Não autorizado, token não encontrado'});
        }
    }catch (error){
        console.log('ERRO NA VERIFICAÇÃO DO TOKEN:', error); 
        return res.status(401).json({message:'Não autorizado, token inválido.'});
    }
}

module.exports = {protect};