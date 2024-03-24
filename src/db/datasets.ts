import { DBType } from "./db";
import { RESOLUTIONS } from "../const/videos";

export const existedVideoDataset: DBType = {
  videos: [
    {
      id: 1,
      title: "Title",
      author: "Author",
      canBeDownloaded: true,
      minAgeRestriction: 18,
      createdAt: `${new Date()}`,
      publicationDate: `${new Date()}`,
      availableResolutions: [RESOLUTIONS.p720, RESOLUTIONS.p1080],
    },
  ],
};
