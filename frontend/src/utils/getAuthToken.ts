import { IncomingMessage } from "http";

export const getAuthToken = (
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  return req.cookies.auth_token;
};
