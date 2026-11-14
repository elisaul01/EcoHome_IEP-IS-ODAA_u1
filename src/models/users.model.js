import pool from "../config/pool.config.js"

class UsersModel {
  async getAll() {
    const query = "SELECT * FROM users ORDER BY id";
    const { rows } = await pool.query(query);
    return rows;
  }

  async create(data) {
    const query = `
            INSERT INTO users (username, email, password_hash, role, created_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING *;
        `;
    const values = [data.username, data.email, data.password_hash, data.role];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async login(data) {
    const query = `
            SELECT *
              FROM users
             WHERE username=$1 AND password_hash=$2
        `;
    const values = [data.username, data.password_hash];

    const { rows } = await pool.query(query, values);
    
    return rows[0];
  }
}

export default UsersModel;