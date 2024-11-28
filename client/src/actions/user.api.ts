import { HeaderConfig, USER_ROUTES } from "@/actions/api.route";
import { requestClient } from "@/actions/api.request";
import { getToken } from "@/lib/utils";
import { UserRequest } from "@/types/user.type";

export const getUserProfileById = async () => {
  const token = await getToken();
  const { data } = await requestClient.get(USER_ROUTES + "/me", HeaderConfig(token));

  return data;
};

export const updateUserProfile = async (body: UserRequest) => {
  // const token = await getToken();
  const { data } = await requestClient.patch(USER_ROUTES + "/me", body);

  return data;
}
