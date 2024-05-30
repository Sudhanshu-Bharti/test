import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletAddressDto {
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  userId: number;

  @ApiProperty({ example: '0x123...', description: 'The wallet address' })
  address: string;
}