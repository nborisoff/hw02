import { Router } from "express";
import { getVideos } from "./getVideosController";
import { createVideo } from "./createVideoController";
import { findVideo } from "./findVideoController";
import { deleteVideo } from "./deleteVideoController";
import { updateVideo } from "./updateVideoController";

export const videosRouter = Router();

videosRouter.get("/", getVideos);
videosRouter.post("/", createVideo);
videosRouter.get("/:id", findVideo);
videosRouter.put("/:id", updateVideo);
videosRouter.delete("/:id", deleteVideo);
