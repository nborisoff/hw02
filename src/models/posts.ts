export type PostIdModel = {
    /**
     * id существующего курса
     */
    id: string;
};

export type CreatePostType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
};
