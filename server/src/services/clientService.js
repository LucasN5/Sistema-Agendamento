import { query } from "../database.js";

export const getClients = async () => {
  const { rows } = await query("SELECT * FROM accounts");
  return rows;
};

export const createClient = async (clientData) => {
  const { userid, username, password } = clientData;
  const { rows } = await query(
    `INSERT INTO accounts (userid, username, password)
            VALUES (1$, 2$, 3$) RETURNING *`,
    [userid, username, password]
  );

  return rows[0];
};
