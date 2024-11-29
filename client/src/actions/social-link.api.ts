import { requestClient } from "@/actions/api.request";
import { SOCIAL_LINK_ROUTES } from "@/actions/api.route";
import { SocialLinkRequest } from "@/types/social-link.type";

export const getAllSocialLink = async () => {
  const { data } = await requestClient.get(
    SOCIAL_LINK_ROUTES
  );

  return data;
};

export const addSocialLink = async (body: SocialLinkRequest) => {
  const { data } = await requestClient.post(
    SOCIAL_LINK_ROUTES,
    body
  );

  return data;
};

export const removeSocialLink = async (id: string) => {
  const { data } = await requestClient.delete(SOCIAL_LINK_ROUTES + "/" + id);

  return data;
}