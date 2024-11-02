import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getToken() {
  return await JSON.parse(localStorage.getItem("token")!);
}

export function decodedToken(token: string) {
  return jwtDecode(token);
}
