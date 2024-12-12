export interface Article {
    title: string;
    content: string;
    tags: string[];
    publish: boolean;
    createdAt: Date;
    updatedAt: Date;
}