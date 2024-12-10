import { body } from "express-validator";

export const articleValidationChain = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be string"),
  body("content")
    .exists({ checkFalsy: true })
    .withMessage("Content is required")
    .isString()
    .withMessage("Content should be string"),
  body("tags")
    .exists({ checkFalsy: true })
    .withMessage("Tags is required")
    .isArray()
    .withMessage("Tags should be array"),
];