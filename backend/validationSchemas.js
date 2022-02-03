const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

const UserSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(20).escapeHTML(),
    lastName: Joi.string().required().min(3).max(20).escapeHTML(),
    username: Joi.string().email().required().escapeHTML(),
    password: Joi.string().required().escapeHTML()

})

const QuerySchema = Joi.object({
    templateid: Joi.number().required()
})
module.exports = { UserSchema, QuerySchema };