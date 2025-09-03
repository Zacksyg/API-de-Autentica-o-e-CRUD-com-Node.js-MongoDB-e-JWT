const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Erro de validação.',
      errors: err.errors,
    });
  }
  
  res.status(500).json({
    message: 'Ocorreu um erro interno no servidor.',
  });
};

module.exports = { errorHandler };