import oracledb, { outFormat } from "oracledb";

const oracleDbConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  connectionString: process.env.DB_HOST,
};

async function runQuery(query: string) {
  let connection;

  try {
    // Establish connection to Oracle Database
    connection = await oracledb.getConnection(oracleDbConfig);

    // This is where we execute the query and return its result
    const result = await connection.execute(
      query,
      [], // binding parameters
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT // <-- This will ensure that rows are returned as objects.
      }
    );
    return result.rows;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (connection) {
      // After, we want to make sure the connection is closed after the exection
      await connection.close();
    }
  }
}

export default runQuery