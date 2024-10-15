// import mariadb from 'mariadb';
// const pool = mariadb.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'marketplace_db',
//     connectionLimit: 5,
//   });

import { AppDataSource } from "../../data-source";

  
//   export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const res = await conn.query(sql, params);
//       return res as T[];
//     } finally {
//       if (conn) conn.end();
//     }
//   }


const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default connectDatabase;