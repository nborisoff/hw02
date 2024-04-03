import { req } from "./test-helpers";
import { ADMIN_AUTH } from "../src/controllers/posts/middlewares";
import { SETTINGS } from "../src/app/settings";
import { setDB } from "../src/db/db";
import { existedBlogDataset } from "../src/db/datasets";

console.log(process.env.NODE_ENV);
describe("/post", () => {
  beforeAll(async () => {
    // setDB();
    await req.delete("/testing/all-data");
  });

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  it("auth: should get empty array", async () => {
    const res = await req
      .get(SETTINGS.PATH.BLOGS)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(200);

    // console.log(res.body)
    // expect(res.body.length).toBe(0)
  });

  it("should get empty array", async () => {
    await req.get(SETTINGS.PATH.BLOGS).expect(200, []);
  });

  it("should create blog", async () => {
    const newBlog = {
      name: "blog1",
      description: "d1",
      websiteUrl: "https://blog1.com",
    };

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ Authorization: "Basic " + codedAuth })
      .send(newBlog)
      .expect(201);

    const res1 = await req
      .get(`${SETTINGS.PATH.BLOGS}/${res.body.id}`)
      .expect(200);
  });

  it(`should update blog`, async () => {
    setDB("blogs", existedBlogDataset);

    await req
      .put(`${SETTINGS.PATH.BLOGS}/1`)
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        name: "blog1",
        description: "d1",
        websiteUrl: "https://blog1.com",
      })
      .expect(204);
  });

  it("should return empty array after deleting blog", async () => {
    setDB("blogs", existedBlogDataset);
    await req
      .delete(`${SETTINGS.PATH.TESTING}/all-data`).set({ Authorization: "Basic " + codedAuth })
      .expect(204);
    await req.get(SETTINGS.PATH.BLOGS).expect(200, []);
  });

  it("should return 404 after trying deleting non-existent blog", async () => {
    await req
      .delete(`${SETTINGS.PATH.BLOGS}/9999`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(404);
  });

  it("should return 404 after deleting blog", async () => {
    setDB("blogs", existedBlogDataset);
    await req
      .delete(`${SETTINGS.PATH.BLOGS}/1`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(204);
    await req.get(`${SETTINGS.PATH.BLOGS}/1`).expect(404);
  });
});
