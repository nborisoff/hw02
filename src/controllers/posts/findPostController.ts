import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";
import { PostIdModel } from "../../models/posts";
import { PostDBType } from "../../types/posts";

export const findPost = (
  req: RequestWithParams<PostIdModel>,
  res: Response<PostDBType>,
) => {
  let post = db.posts.find((c) => c.id === req.params.id);

  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(post);
};
