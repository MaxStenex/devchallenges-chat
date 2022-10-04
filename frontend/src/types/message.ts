export type Message = {
  id: number;
  text: string;
  username?: string;
  fromSystem: boolean;
  sendDate: Date;
};
