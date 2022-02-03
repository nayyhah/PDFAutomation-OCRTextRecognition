const ExpressError = require('../utils/ExpressError')
const { UserSchema, QuerySchema } = require('../validationSchemas')

module.exports.ValidateUser = function(req, res, next) {
    const { error } = UserSchema.validate(req.body);
    if (error) {
        const msg = error.details[0].message;
        res.status(400).json({
            "Error": msg
        })
    } else
        next()
}

module.exports.ValidateQuery = function(req, res, next) {
    // console.dir(req.form)
    const { error } = QuerySchema.validate(req.body);
    if (error) {
        const msg = error.details[0].message;
        res.status(400).json({
            "Error": msg
        })
    } else
        next()
}