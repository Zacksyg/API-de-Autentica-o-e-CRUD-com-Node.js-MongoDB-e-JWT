const {z, email} = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(3, { message: 'O nome precisa ter no mínimo 3 caracteres.' }),
    email: z.string().email({ message: 'Formato de email inválido.' }),
    password: z.string().min(8, { message: 'A senha precisa ter no mínimo 8 caracteres.' }),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email({message: 'Email ou senha inválidos.'}),
    password: z.string().min(1, {message: 'Email ou senha inválidos.'})
  }),
});

module.exports = {
    registerSchema,
    loginSchema,
};