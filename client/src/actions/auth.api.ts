import { GET_ME_ROUTE, LOG_OUT_ROUTE, LOGIN_ROUTE, REFRESH_TOKEN_ROUTE, REGISTER_ROUTE, requestClient, VERIFY_REGISTER_ROUTE } from "@/actions/api.route";
import { getToken } from "@/lib/utils";
import { AuthRegister } from "@/types/auth.type";

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

export const login = async (email: string, password: string): Promise<any> => {
  const { data } = await requestClient.post(LOGIN_ROUTE, {
    email,
    password,
  });

  return data;
}

export const register = async (body: AuthRegister): Promise<any> => {
  const { data } = await requestClient.post(REGISTER_ROUTE, body);

  return data;
}

export const logout = async (userId: string, token: string): Promise<any> => {
  const { data } = await requestClient.post(
    LOG_OUT_ROUTE, 
    { userId }, 
    HeaderConfig(token)
  );

  return data;
}

export const verifyRegister = async (email: string, code: string): Promise<any> => {
  const { data } = await requestClient.post(VERIFY_REGISTER_ROUTE, {
    email,
    code
  });

  return data;
}

export const getMe = async (token: string): Promise<any> => {
  const { data } = await requestClient.get(
    GET_ME_ROUTE,
    HeaderConfig(token),
  );

  return data;
};

export const refreshToken = async (): Promise<any> => {
  const token = await getToken();

  const { data } = await requestClient.post(
    REFRESH_TOKEN_ROUTE,
    HeaderConfig(token),
  );

  return data;
}