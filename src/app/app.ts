import express from "express";
import { SETTINGS } from "./settings";
import { videosRouter } from "../controllers/videos/routes";
import { testingRouter } from "../controllers/testing/routes";
import cors from 'cors';

export const app = express();

const parseBodyMiddleware = express.json();
app.use(parseBodyMiddleware);
app.use(cors());

app.use(SETTINGS.PATH.VIDEOS, videosRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);
