import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { videoIdModel } from "../../models/videos";
import { VideoDBType } from "../../types/videos";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const findVideo = (
  req: RequestWithParams<videoIdModel>,
  res: Response<VideoDBType>,
) => {
  let video = db.videos.find((c) => c.id === +req.params.id);

  if (!video) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
// console.log(video)
  res.status(HTTP_STATUSES.OK_200).json(video);
};
