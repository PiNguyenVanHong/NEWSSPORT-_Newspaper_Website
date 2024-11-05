import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import slug from "slug";
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

export const generateSlug = (title: string, id: string) => {
  const rst = slug(title) + "-ar" + id + ".html";
  return rst;
};

export const getIdFromSlug = (pathname: string) => {
  const str = pathname.split(".html")[0].split("-");

  return str[str.length - 1].replace("ar", "");
};


export interface QueryObject {
  filter?: {
    [key: string]: string | number | RegExp | Date | { $gt?: Date | number; $lt?: Date | number };
  };
  sort?: { [key: string]: 1 | -1 };
  skip?: number;
  limit?: number;
  projection?: { [key: string]: 1 };
  population?: Array<{ path: string; select?: { [key: string]: 1 } }>;
}

export const buildQueryString = (params: QueryObject): string => {
  const queryParts: string[] = [];

  const handleObject = (key: string, value: any) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      for (const subKey in value) {
        const subValue = value[subKey];
        if (subKey === '$gt') {
          queryParts.push(`${key}>${formatDate(subValue)}`);
        } else if (subKey === '$lt') {
          queryParts.push(`${key}<${formatDate(subValue)}`);
        } else {
          queryParts.push(`${key}.${subKey}=${subValue}`);
        }
      }
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item.path) {
          queryParts.push(`populate=${item.path}`);
          if (item.select) {
            const selectFields = Object.keys(item.select)
              .filter((field) => item.select[field] === 1)
              .join(',');
            queryParts.push(`fields=${selectFields}`);
          }
        }
      });
    } else {
      queryParts.push(`${key}=${value}`);
    }
  }

  for (const key in params) {
    const value = params[key as keyof QueryObject];
    if (key === 'filter' && typeof value === 'object') {
      Object.keys(value).forEach((filterKey) => {
        handleObject(filterKey, (value as QueryObject['filter'] as any)[filterKey]);
      });
    } else if (key === 'sort') {
      const sortField = Object.keys(value || {})[0];
      const sortOrder = value && (value[sortField]) === -1 ? '-' : '';
      queryParts.push(`sort=${sortOrder}${sortField}`);
    } else if (key === 'projection') {
      const fields = Object.keys(value || {}).join(',');
      queryParts.push(`fields=${fields}`);
    } else if (value !== undefined) {
      handleObject(key, value);
    }
  }

  return `?${queryParts.join('&')}`;
}

const formatDate = (date: Date | string | number): string => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return date.toString();
}