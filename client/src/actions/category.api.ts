import { GET_ALL_CATEGORY, requestClient } from "@/actions/api.route";

// const HeaderConfig = (token: string) => {
//   return {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

export const getAllCategory = async () => {
  const { data } = await requestClient.get(GET_ALL_CATEGORY);

  return data;
};
