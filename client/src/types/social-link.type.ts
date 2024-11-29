export type SocialLinkRequest = {
    name: string;
    url: string;
};

export type SocialLinkResponse = {
    id?: string,
    name: string,
    link: string,
};