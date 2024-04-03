import { req } from "./test-helpers";
import { ADMIN_AUTH } from "../src/controllers/posts/middlewares";
import { SETTINGS } from "../src/app/settings";
import { setDB } from "../src/db/db";
import {
  existedBlogDataset,
  existedPostDataset,
} from "../src/db/datasets";

// console.log(process.env.NODE_ENV);
describe("/post", () => {
  beforeAll(async () => {
    // setDB();
    await req.delete("/testing/all-data");
    await req
      .post(SETTINGS.PATH.POSTS)
      .set({ Authorisation: "Basic " + codedAuth })
      .send({
        name: "new blog",
        websiteUrl: "https://someurl.com",
        description: "description",
      })
      .expect(201);
  });

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  it("should get empty array", async () => {
    const res = await req
      .get(SETTINGS.PATH.POSTS)
      .expect(200);

    // console.log(res.body)

    // expect(res.body.length).toBe(0)
  });

  it("should create post", async () => {
    setDB("blogs", existedBlogDataset);

    const newPost = {
      title: "testP",
      shortDescription: "testSD",
      content: "testC",
      blogId: "1",
    };

    // await req.get(`${SETTINGS.PATH.BLOGS}/${newPost.blogId}`).expect(200);

    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .set({ Authorisation: "Basic " + codedAuth })
      .send(newPost)
      .expect(201);

    await req.get(`${SETTINGS.PATH.POSTS}/${res.body.id}`).expect(200);
  });

  it(`should update post`, async () => {
    setDB("posts", existedPostDataset);
    setDB("blogs", existedBlogDataset);

    await req
      .put(`${SETTINGS.PATH.POSTS}/1`)
      .set({ Authorisation: "Basic " + codedAuth })
      .send({
        title: "testP2",
        shortDescription: "testSD2",
        content: "testC2",
        blogId: "2",
      })
      .expect(204);
  });

  it("should return empty array after deleting post", async () => {
    setDB("posts", existedPostDataset);
    await req
      .delete(`${SETTINGS.PATH.TESTING}/all-data`)
      .set({ Authorisation: "Basic " + codedAuth })
      .expect(204);
    await req.get(SETTINGS.PATH.POSTS).expect(200, []);
  });

  it("should return 404 after trying deleting non-existent post", async () => {
    await req
      .delete(`${SETTINGS.PATH.POSTS}/9999`)
      .set({ Authorisation: "Basic " + codedAuth })
      .expect(404);
  });

  it("should return 404 after deleting post", async () => {
    setDB("posts", existedPostDataset);
    await req
      .delete(`${SETTINGS.PATH.POSTS}/1`)
      .set({ Authorisation: "Basic " + codedAuth })
      .expect(204);
    await req.get(`${SETTINGS.PATH.POSTS}/1`).expect(404);
  });

  // it("should return empty array after deleting", async () => {
  //   await req.delete(`${SETTINGS.PATH.TESTING}/all-data`).set({ Authorisation: "Basic " + codedAuth }).expect(204);
  // });
});
