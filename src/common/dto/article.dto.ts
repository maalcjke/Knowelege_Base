export interface Article {
    title: string;
    content: string;
    tags: string[];
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}