import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { WalletAddressService } from './wallet-address/wallet-address.service';
import { WalletAddressController } from './wallet-address/wallet-address.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UsersController, WalletAddressController],
  providers: [UsersService, WalletAddressService],
})
export class AppModule {}
