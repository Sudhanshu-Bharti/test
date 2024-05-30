import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async createUser(name: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const result = await this.pool.query(
      'INSERT INTO Users (name, password) VALUES ($1, $2) RETURNING *',
      [name, hashedPassword]
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
    const hashedPassword = await this.hashPassword(password);
    const result = await this.pool.query(
      'UPDATE Users SET name = $1, password = $2 WHERE id = $3 RETURNING *',
      [name, hashedPassword, id]
    );
    return result.rows[0];
  }

  async deleteUser(id: number) {
    const result = await this.pool.query('DELETE FROM Users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  async validateUserPassword(name: string, password: string): Promise<boolean> {
    const result = await this.pool.query('SELECT password FROM Users WHERE name = $1', [name]);
    if (result.rows.length === 0) {
      return false;
    }
    const storedPassword = result.rows[0].password;
    return bcrypt.compare(password, storedPassword);
  }
}
