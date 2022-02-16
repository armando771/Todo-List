const Joi = require('joi');

const schema = Joi.object().keys({
  taskName: Joi.string().min(5).required(),
  taskContent: Joi.string().min(10).required(),
  taskStatus: Joi.string().required()
});

const validateTask = (request, response, next) => {
  const validation = schema.validate(request.body);
  if (validation.error) {
    return response.status(422).json({
      err: {
        code: 'invalid_data',
        message: validation.error.message,
      },
    });
  }
  next();
};

module.exports = validateTask;