import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { db } from "../../db/db";

export const clearDb = (req: Request, res: Response) => {
  db.videos = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
