import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async createUser(name: string, password: string) {
    const result = await this.pool.query(
      'INSERT INTO Users (name, password) VALUES ($1, $2) RETURNING *',
      [name, password]
    );
    return result.rows[0];
  }

  async findAllUsers() {
    const result = await this.pool.query('SELECT * FROM Users');
    return result.rows;
  }

  async findUserById(id: number) {
    const result = await this.pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async updateUser(id: number, name: string, password: string) {
    const result = await this.pool.query(
      'UPDATE Users SET name = $1, password = $2 WHERE id = $3 RETURNING *',
      [name, password, id]
    );
    return result.rows[0];
  }

  async deleteUser(id: number) {
    const result = await this.pool.query('DELETE FROM Users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

