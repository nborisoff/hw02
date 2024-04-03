import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { VideoIdModel } from "../../models/videos";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";

export const deleteVideo = (req: RequestWithParams<VideoIdModel>, res: Response) => {
  const index = db.videos.findIndex((item) => item.id === +req.params.id);

  if (index === -1) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  db.videos.splice(index, 1);

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
