import { Request, Response } from "express";
import { db } from "../../db/db";
import { VideoDBType } from "../../types/videos";
import { RequestWithQuery } from "../../types/common-types";
import {HTTP_STATUSES} from "../../app/settings";

export const getVideos = (
  req: Request<RequestWithQuery<VideoDBType>>,
  res: Response<VideoDBType[]>,
) => {
  let videos = db.videos;

  // if (Object.keys(req.query)) {
  //   videos = videos.filter((c) => c.title.indexOf(req.query.title) > -1);
  // }

  res.status(HTTP_STATUSES.OK_200).json(
    videos.map((video) => {
      return video;
    }),
  );
};
