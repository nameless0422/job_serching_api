const Joi = require('joi');

exports.preferencesSchema = Joi.object({
    preferredJobTypes: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Preferred job types are required.',
    }),
    preferredLocations: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Preferred locations are required.',
    }),
    notificationSettings: Joi.object({
        email: Joi.boolean().required(),
        sms: Joi.boolean().required(),
        push: Joi.boolean().required(),
    }).required().messages({
        'any.required': 'Notification settings are required.',
    }),
});
