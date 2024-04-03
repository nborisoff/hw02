import { Router, Response, Request, NextFunction } from "express";
import {
  body,
  FieldValidationError,
  validationResult,
} from "express-validator";
import { postRepository } from "./postRepository";
import { db } from "../../db/db";
import { blogRepository } from "../blogs/blogRepository";

const postTitleInputValidator = body("title")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .isLength({ max: 100 })
  .withMessage("length limit exceeded");
const postShortDescriptionInputValidator = body("shortDescription")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .isLength({ max: 100 })
  .withMessage("length limit exceeded");
const postContentInputValidator = body("content")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .isLength({ max: 1000 })
  .withMessage("length limit exceeded");
const postBlogIdInputValidator = body("blogId")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string");

export const postInputValidators = [
  postTitleInputValidator,
  postShortDescriptionInputValidator,
  postContentInputValidator,
  postBlogIdInputValidator,
  body("blogId")
    .custom(async (blogId, { req }) => {
      const blog = await blogRepository.find(blogId);
      console.log(blog)
      if (!blog) {
        return Promise.reject("blog not found");
      }
    })
    .withMessage("blog not found"),
];

export const inputCheckErrorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const e = validationResult(req);
  const errors = e.array();

  if (errors.length) {
    res.status(400).json({
      errorsMessages: errors.map((error) => {
        const { msg, path } = error as FieldValidationError;
        return { message: `${path} error`, field: path, description: msg };
      }),
    });
    return;
  }

  next();
};

export const ADMIN_AUTH = "admin:qwerty"; // get from SETTINGS
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers["authorisation"] as string; // 'Basic xxxx'

  if (!auth) {
    res.status(401).json({});
    return;
  }
  const buff = Buffer.from(auth.slice(6), "base64");
  const decodedAuth = buff.toString("utf8");

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  // if (decodedAuth !== ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
  if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== "Basic") {
    res.status(401).json({});
    return;
  }

  next();
};
