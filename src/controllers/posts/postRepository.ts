import { PostDBType } from "../../types/posts";
import { db } from "../../db/db";
import { CreatePostType } from "../../models/posts";

export const postRepository = {
  async create(
    input: CreatePostType,
  ): Promise<{ error?: string; id?: string }> {
    const newPost: PostDBType = {
      ...input,
      blogName: db.blogs.find((blog) => blog.id === input.blogId)!.name,
      id: `${Date.now() + Math.random()}`,
    };
    db.posts = [...db.posts, newPost];

    return { id: newPost.id };
  },
  async find(id: string): Promise<PostDBType | undefined> {
    return db.posts.find((p) => p.id === id);
  },
  async findForOutput(id: string): Promise<null | PostDBType> {
    const post = await this.find(id);
    if (!post) {
      return null;
    }
    return this.mapToOutput(post);
  },
  mapToOutput(post: PostDBType): PostDBType {
    const { id, title, shortDescription, content, blogId, blogName } = post;

    return {
      id,
      title,
      shortDescription,
      content,
      blogId,
      blogName,
    };
  },
};
