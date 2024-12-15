const Joi = require('joi');

exports.preferencesSchema = Joi.object({
    userId: Joi.string().required().regex(/^[a-f\d]{24}$/i).message('Invalid user ID'),
    preferredJobTypes: Joi.array().items(Joi.string()).optional(),
    preferredLocations: Joi.array().items(Joi.string()).optional(),
    notificationSettings: Joi.object({
        email: Joi.boolean().optional(),
        sms: Joi.boolean().optional(),
        push: Joi.boolean().optional(),
    }).optional(),
});
