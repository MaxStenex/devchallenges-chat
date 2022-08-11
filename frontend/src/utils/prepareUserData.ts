export const prepareUserData = (data: any) => {
  return {
    id: data.id,
    email: data.email,
    loggedIn: true,
    username: data.username,
  };
};
