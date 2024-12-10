export interface Article {
    id?: number;
    title: string;
    content: string;
    tags: string[];
    publish: boolean;
    createdAt: Date;
    updatedAt: Date;
}