import { GET_ME_ROUTE, LOGIN_ROUTE, requestClient } from "@/actions/api.route";
import { getToken } from "@/lib/utils";

export type AuthMeType = {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

const HeaderConfig = (token: string) => {
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function login(email: string, password: string) {
  const { data } = await requestClient.post(LOGIN_ROUTE, {
    email,
    password,
  });

  return data;
}

export const getMe = async (token: string) => {
  const { data } = await requestClient.get(
    GET_ME_ROUTE,
    HeaderConfig(token),
  );

  return data;
};