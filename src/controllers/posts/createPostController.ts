import { Request, Response } from "express";
import { postRepository } from "./postRepository";

export const createPost = async (req: Request, res: Response) => {
  const createdInfo = await postRepository.create(req.body);

  if (!createdInfo.id) {
    res.status(500).json({});
    return;
  }

  const newPost = await postRepository.findForOutput(createdInfo.id);

  res.status(201).json(newPost);
};
