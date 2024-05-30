import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class WalletAddressService {
  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  private async checkUserExists(userId: number): Promise<void> {
    const result = await this.pool.query('SELECT * FROM Users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async createWalletAddress(userId: number, address: string) {
    await this.checkUserExists(userId);
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
    if (result.rows.length === 0) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    return result.rows[0];
  }

  async updateWalletAddress(id: number, userId: number, address: string) {
    await this.checkUserExists(userId);
    const result = await this.pool.query(
      'UPDATE WalletAddress SET userId = $1, address = $2 WHERE id = $3 RETURNING *',
      [userId, address, id]
    );
    if (result.rows.length === 0) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    return result.rows[0];
  }

  async deleteWalletAddress(id: number) {
    const result = await this.pool.query('DELETE FROM WalletAddress WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      throw new NotFoundException(`Wallet address with ID ${id} not found`);
    }
    return result.rows[0];
  }
}
