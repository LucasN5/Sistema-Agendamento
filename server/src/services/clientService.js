import { query } from "../database.js";

export const getClients = async () => {
  const { rows } = await query("SELECT * FROM accounts");
  return rows;
};

export const createClient = async (clientData) => {
  const { user_email, password, tel, first_name, second_name, company_name } =
    clientData;
  const { rows } = await query(
    `INSERT INTO accounts ( user_email, password, tel, first_name, second_name, company_name)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user_email, password, tel, first_name, second_name, company_name]
  );

  return rows[0];
};

/* Alterar colunas do back-end para as colunas corretas que estão no
banco de dados*/
