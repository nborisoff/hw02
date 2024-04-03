import { Response } from "express";
import { RequestWithParamsAndBody } from "../../types/common-types";
import { CreatePostType, PostIdModel } from "../../models/posts";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const updatePost = (
  req: RequestWithParamsAndBody<PostIdModel, CreatePostType>,
  res: Response,
) => {
  let post = db.posts.find((c) => c.id === req.params.id);

  if (!post) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let { title, shortDescription, content, blogId } = req.body;

  post.title = title;
  post.shortDescription = shortDescription;
  post.content = content;
  post.blogId = blogId;

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
