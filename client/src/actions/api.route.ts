export const HOST = import.meta.env.VITE_PUBLIC_BACKEND_URL;

// const AUTH_ROUTES = `${HOST}/api/auth`;
// // const USER_ROUTES = `${HOST}/api/users`;
// export const CATEGORY_ROUTES = `${HOST}/api/categories`;
// export const ARTICLE_ROUTES = `${HOST}/api/articles`;
// export const FAVORITE_ROUTES = `${HOST}/api/favorites`;

// export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
// export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
// export const LOG_OUT_ROUTE = `${AUTH_ROUTES}/logout`;
// export const VERIFY_REGISTER_ROUTE = `${AUTH_ROUTES}/verify`;
// export const GET_ME_ROUTE = `${AUTH_ROUTES}/me`;
// export const REFRESH_TOKEN_ROUTE = `${AUTH_ROUTES}/refresh`;

// export const GET_ALL_CATEGORY = `${CATEGORY_ROUTES}`;
// export const CREATE_CATEGORY = `${CATEGORY_ROUTES}`;

const AUTH_ROUTES = `/api/auth`;
// const USER_ROUTES = `/api/users`;
export const CATEGORY_ROUTES = `/api/categories`;
export const ARTICLE_ROUTES = `/api/articles`;
export const FAVORITE_ROUTES = `/api/favorites`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
export const LOG_OUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const VERIFY_REGISTER_ROUTE = `${AUTH_ROUTES}/verify`;
export const GET_ME_ROUTE = `${AUTH_ROUTES}/me`;
export const REFRESH_TOKEN_ROUTE = `${AUTH_ROUTES}/refresh`;

export const GET_ALL_CATEGORY = `${CATEGORY_ROUTES}`;
export const CREATE_CATEGORY = `${CATEGORY_ROUTES}`;

export const HeaderConfig = (token: string, isFile?: boolean) => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (isFile) {
    headers["Content-Type"] = "multipart/form-data";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return { headers };
};