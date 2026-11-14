import pool from "../config/pool.config.js";

class ProductsModel {
  async getAll() {
    const query = "SELECT * FROM products ORDER BY id";
    const { rows } = await pool.query(query);
    return rows;
  }

  async getOne(id){
    const query = "SELECT * FROM products WHERE id=$1";
    const values = [id];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async create(data) {
    const query = `
            INSERT INTO products (name, price, created_at)
            VALUES ($1, $2, NOW())
            RETURNING *;
        `;
    const values = [data.name, data.price];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async update(data) {
    const query = `
            UPDATE products 
               SET name = $1
                 , price = $2
                 , updated_at = NOW()
             where id = $3
            RETURNING *;
        `;
    const values = [data.name, data.price, data.id];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async delete(id) {
    const query = `
            DELETE FROM products 
             where id = $1
            RETURNING *;
        `;
    const values = [id];

    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

export default ProductsModel;