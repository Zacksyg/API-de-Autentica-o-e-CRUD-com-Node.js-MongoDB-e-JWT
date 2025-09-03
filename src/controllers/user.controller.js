const User = require('../models/user.model');

const getMe = async (req, res, next) => {
    try{
        const userId = req.user.id;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({message:'Usuário não encontrado.'});
        }
        
        res.status(200).json({user});
    } catch (error) {
        next(error);
    }
};

module.exports = {getMe};