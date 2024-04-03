import { Request, Response } from "express";
import { db } from "../../db/db";
import { VideoDBType } from "../../types/videos";
import {HTTP_STATUSES} from "../../app/settings";

export const getBlogs = (
  req: Request,
  res: Response<VideoDBType[]>,
) => {
  let blogs = db.videos;

  res.status(HTTP_STATUSES.OK_200).json(
    blogs.map((video) => {
      return video;
    }),
  );
};
