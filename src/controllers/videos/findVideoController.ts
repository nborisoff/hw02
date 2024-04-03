import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { VideoIdModel } from "../../models/videos";
import { VideoDBType } from "../../types/videos";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const findVideo = (
  req: RequestWithParams<VideoIdModel>,
  res: Response<VideoDBType>,
) => {
  let video = db.videos.find((c) => c.id === +req.params.id);

  if (!video) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(video);
};
