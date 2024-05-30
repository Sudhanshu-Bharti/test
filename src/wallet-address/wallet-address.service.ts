import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class WalletAddressService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async createWalletAddress(userId: number, address: string) {
    const result = await this.pool.query(
      'INSERT INTO WalletAddress (userId, address) VALUES ($1, $2) RETURNING *',
      [userId, address]
    );
    return result.rows[0];
  }

  async findAllWalletAddresses() {
    const result = await this.pool.query('SELECT * FROM WalletAddress');
    return result.rows;
  }

  async findWalletAddressById(id: number) {
    const result = await this.pool.query('SELECT * FROM WalletAddress WHERE id = $1', [id]);
    return result.rows[0];
  }

  async updateWalletAddress(id: number, userId: number, address: string) {
    const result = await this.pool.query(
      'UPDATE WalletAddress SET userId = $1, address = $2 WHERE id = $3 RETURNING *',
      [userId, address, id]
    );
    return result.rows[0];
  }

  async deleteWalletAddress(id: number) {
    const result = await this.pool.query('DELETE FROM WalletAddress WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
