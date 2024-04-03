import { RESOLUTIONS } from "../const/videos";
import { VideoDBType } from "../types/videos";
import { BlogDBType } from "../types/blogs";
import { PostDBType } from "../types/posts";

export const existedVideoDataset: VideoDBType[] = [
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
];

export const existedBlogDataset: BlogDBType[] = [
  {
    id: "1",
    name: "testBlog1",
    description: "testD1",
    websiteUrl: "https://test1.com",
  },
  {
    id: "2",
    name: "testBlog2",
    description: "test2D",
    websiteUrl: "https://test2.com",
  },
];

export const existedPostDataset: PostDBType[] = [
  {
    id: "1",
    title: "t1",
    shortDescription: "sd1",
    content: "c1",
    blogId: "1",
    blogName: "bn1",
  },
];
