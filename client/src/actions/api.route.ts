import axios from "axios";

export const HOST = import.meta.env.VITE_PUBLIC_BACKEND_URL;

const AUTH_ROUTES = `${HOST}/api/auth`;
const USER_ROUTES = `${HOST}/api/users`;

export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const REGISTER_ROUTE = `${AUTH_ROUTES}/register`;
export const LOG_OUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const VERIFY_REGISTER_ROUTE = `${AUTH_ROUTES}/verify`;
export const GET_ME_ROUTE = `${AUTH_ROUTES}/me`;





export const requestClient = axios.create({
  timeout: 20000,
  withCredentials: true,
});
