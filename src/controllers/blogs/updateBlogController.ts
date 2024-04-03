import { Response } from "express";
import { RequestWithParamsAndBody } from "../../types/common-types";
import { CreateBlogType, BlogIdModel } from "../../models/blogs";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const updateBlog = (
  req: RequestWithParamsAndBody<BlogIdModel, CreateBlogType>,
  res: Response,
) => {
  let blog = db.blogs.find((c) => c.id === req.params.id);

  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let { name, description, websiteUrl } = req.body;

  blog.name = name;
  blog.description = description;
  blog.websiteUrl = websiteUrl;

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
