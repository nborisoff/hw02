import { req } from "./test-helpers";
import { SETTINGS } from "../src/app/settings";
import { setDB } from "../src/db/db";
import { existedVideoDataset } from "../src/db/datasets";
import { InputVideoType } from "../src/models/videos";
import { RESOLUTIONS } from "../src/const/videos";

describe("/videos", () => {
  beforeAll(async () => {
    // setDB();
    await req.delete("/testing/all-data");
  });

  it("should get empty array", async () => {
    await req.get(SETTINGS.PATH.VIDEOS).expect(200, []);
  });

  it("should get not empty array", async () => {
    setDB(existedVideoDataset);
    const res = await req.get(SETTINGS.PATH.VIDEOS).expect(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toEqual(existedVideoDataset.videos[0]);
  });

  it("should return existing video", async () => {
    setDB(existedVideoDataset);
    await req.get(`${SETTINGS.PATH.VIDEOS}/1`).expect(200);
  });

  it("should return 404 for not existing video", async () => {
    setDB(existedVideoDataset);
    await req.get(`${SETTINGS.PATH.VIDEOS}/999`).expect(404);
  });

  it("should create video", async () => {
    // setDB();
    const newVideo = {
      title: "t1",
      author: "a1",
      availableResolutions: ["P720"],
    };

    const res = await req.post(SETTINGS.PATH.VIDEOS).send(newVideo).expect(201);

    // expect(res.body.availableResolutions[0]).toEqual(
    //   newVideo.availableResolutions[0],
    // );
    const res1 = await req.get(`${SETTINGS.PATH.VIDEOS}/${res.body.id}`).expect(200);

  });


  it(`should update video`, async () => {
    setDB(existedVideoDataset);

    await req
      .put(`${SETTINGS.PATH.VIDEOS}/1`)
      .send({
        title: "t2",
        author: "ta",
        availableResolutions: ["P1080"],
        canBeDownloaded: true,
        minAgeRestriction: 18,
        publicationDate: `${new Date()}`,
      })
      .expect(204);
  });

  it("should return empty array after deleting", async () => {
    setDB(existedVideoDataset);
    await req.delete(`${SETTINGS.PATH.TESTING}/all-data`).expect(204);
    await req.get(SETTINGS.PATH.VIDEOS).expect(200, []);
  });

  it("should return 404 after trying deleting non-existent video", async () => {
    await req.delete(`${SETTINGS.PATH.VIDEOS}/9999`).expect(404);
  });

  it("should return 404 after  deleting  video", async () => {
    setDB(existedVideoDataset);
    await req.delete(`${SETTINGS.PATH.VIDEOS}/1`).expect(204);
    await req.get(`${SETTINGS.PATH.VIDEOS}/1`).expect(404);
  });
});
