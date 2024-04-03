import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { PostIdModel } from "../../models/posts";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const deletePost = (req: RequestWithParams<PostIdModel>, res: Response) => {
  const index = db.posts.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  db.posts.splice(index, 1);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
