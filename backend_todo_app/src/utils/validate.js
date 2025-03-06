import Joi from "joi";
const todoSchema = Joi.object({
    todo:Joi
    .string()
    .trim()
    .min(3)
    .max(225)
    .messages({
        "string.empty":"Todo can not be empty",
        "string.min":"Todo have atleast 3 character",
        "string.max":"Todo should not exceed 225 character",
        "any.required":"Todo is required field"
    }).required()
});

export default todoSchema