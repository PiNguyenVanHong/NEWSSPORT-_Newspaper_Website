export type UserResponse = {
    id?: string,
    firstName: string,
    lastName: string,
    avatar: string,
}

export type MetaResponse = {
    current: number,
    pageSize: number,
    pages: number,
    total: number,
}