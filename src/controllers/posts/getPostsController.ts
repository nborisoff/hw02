import { Request, Response, NextFunction } from "express";
import { db } from "../../db/db";
import { RequestWithQuery } from "../../types/common-types";
import { HTTP_STATUSES } from "../../app/settings";
import { PostDBType } from "../../types/posts";
// import {OutputVideoType} from '../input-output-models/video-models'

export const getPosts = (
  req: Request,
  res: Response<PostDBType[]>,
  next: NextFunction,
) => {
  let posts = db.posts;

  res.status(HTTP_STATUSES.OK_200).json(
    posts.map((video) => {
      return video;
    }),
  );
};
