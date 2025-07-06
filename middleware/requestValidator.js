// middleware/requestValidator.js
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 3 },
  },
  required: ['id', 'name'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid request data', details: validate.errors });
    }
  }
  next();
};
