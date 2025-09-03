const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const { generateAcessToken, generateRefreshToken } = require('../utils/jwt.utils');


const register = async (req, res, next) => {
    try{
        const {name, email, password} =  registerSchema.parse(req).body;
        
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(409).json({message:'Este email já esta em uso.'});
        }

        const newUser = new User({name, email, password});
        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: userResponse,
        });
    } catch(error){
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const {email, password} = loginSchema.parse(req).body;

        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message:'Email ou senha inválidos.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({message: 'Email ou senha inválidos.'});
        }
        const acessToken = generateAcessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'Login Bem Sucedido!',
            acessToken,
            refreshToken,
            user: userResponse,
        });
    } catch (error){
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Refresh token não fornecido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(decoded.sub);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Refresh token inválido ou expirado.' });
  }
};



module.exports = {
    register,
    login,
    refreshToken,
}