import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";
import { BlogIdModel } from "../../models/blogs";
import { BlogDBType } from "../../types/blogs";

export const findBlog = (
  req: RequestWithParams<BlogIdModel>,
  res: Response<BlogDBType>,
) => {
  let blog = db.blogs.find((c) => c.id === req.params.id);

  if (!blog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(blog);
};
