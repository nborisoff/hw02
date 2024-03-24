import { Request, Response } from "express";
import { SETTINGS } from "./app/settings";
import { app } from "./app/app";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Samurai!");
});
app.listen(SETTINGS.PORT, () => {
  console.log(`App listening on port ${SETTINGS.PORT}`);
});
