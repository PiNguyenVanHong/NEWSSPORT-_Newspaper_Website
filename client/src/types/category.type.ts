export type CategoryRequest = {
    name: string;
    descrption?: string;
    alias: string;
    level: number;
};

export type CategoryResponse = {
    id?: string;
    name: string;
    description: string;
    alias: string;
    level: number;
    isDeleted: boolean;
    deletedAt?: Date;
    createdAt?: Date;
};