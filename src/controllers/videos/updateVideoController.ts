import { Response } from "express";
import { RequestWithParamsAndBody } from "../../types/common-types";
import { UpdateVideoModel, videoIdModel } from "../../models/videos";
import { db } from "../../db/db";
import { HTTP_STATUSES } from "../../app/settings";
import { inputValidation, isResolutionCorrect } from "../../utils/common";

export const updateVideo = (
  req: RequestWithParamsAndBody<videoIdModel, UpdateVideoModel>,
  res: Response,
) => {
  let video = db.videos.find((c) => c.id === +req.params.id);

  if (!video) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  const errors = inputValidation(req.body);

  if (errors.errorsMessages.length) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    return;
  }

  let {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate,
  } = req.body;

  video.title = title || video.title;
  video.author = author || video.author;
  video.availableResolutions =
    availableResolutions || video.availableResolutions;
  video.canBeDownloaded = canBeDownloaded || video.canBeDownloaded;
  video.minAgeRestriction = minAgeRestriction || video.minAgeRestriction;
  video.publicationDate = publicationDate || video.publicationDate;

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
