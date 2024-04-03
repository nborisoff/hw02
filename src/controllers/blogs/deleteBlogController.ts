import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { BlogIdModel } from "../../models/blogs";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const deleteBlog = (req: RequestWithParams<BlogIdModel>, res: Response) => {
  const index = db.blogs.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  db.blogs.splice(index, 1);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
