import { body } from "express-validator";

export const articleUpdateValidationChain = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("Id is required")
    .isInt()
    .withMessage("Id should be integer"),
  body("title")
    .optional()
    .isString()
    .withMessage("Title should be string"),
  body("content")
    .optional()
    .isString()
    .withMessage("Content should be string"),
  body("tags")
    .isArray()
    .withMessage("Tags should be array")
    .optional()
];