import { SocialLinkResponse } from "./social-link.type"

export type UserRequest = {
    email: string,
    firstName: string,
    lastName: string,
    phone?: string,
    bio?: string,
    avatar?: string,
    isTwoFactorEnabled?: boolean,
}

export type UserResponse = {
    id?: string,
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string,
    bio?: string,
    avatar: string,
    isTwoFactorEnabled?: boolean,
    socialLinks?: SocialLinkResponse[],
}

export type MetaResponse = {
    current: number,
    pageSize: number,
    pages: number,
    total: number,
}

export type CodeResponse = {
    id?: string,
    code?: string,
    email?: string,
    expires?: Date,
}