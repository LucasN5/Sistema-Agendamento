import { query } from "../database.js";

export const getAdmin = async () => {
  const { rows } = await query("SELECT * FROM admin");
  return rows;
};
