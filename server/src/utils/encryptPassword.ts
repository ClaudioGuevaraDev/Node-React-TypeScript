import bcryt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcryt.genSalt(10);
  return await bcryt.hash(password, salt);
};
