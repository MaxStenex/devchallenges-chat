import dayjs from "dayjs";

export const getMessageDate = (createdAt: string) => {
  return dayjs(createdAt).format("YYYY-MM-DD");
};
