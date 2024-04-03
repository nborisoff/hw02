import { BlogDBType } from "../../types/blogs";
import { db } from "../../db/db";
import { CreateBlogType } from "../../models/blogs";

export const blogRepository = {
  async create(
    input: CreateBlogType,
  ): Promise<{ error?: string; id?: string }> {
    const newBlog: BlogDBType = {
      ...input,
      id: `${Date.now() + Math.random()}`,
    };
    db.blogs = [...db.blogs, newBlog];

    return { id: newBlog.id };
  },
  async find(id: string): Promise<BlogDBType | undefined> {
    return db.blogs.find((p) => p.id === id);
  },
  async findForOutput(id: string): Promise<null | BlogDBType> {
    const blog = await this.find(id);
    if (!blog) {
      return null;
    }
    return this.mapToOutput(blog);
  },
  mapToOutput(blog: BlogDBType): BlogDBType {
    const { id, name, description, websiteUrl } = blog;
    return {
      id,
      name,
      description,
      websiteUrl,
    };
  },
};
