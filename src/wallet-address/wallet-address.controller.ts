import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';

@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Post()
  create(@Body() body) {
    return this.walletAddressService.createWalletAddress(body.userId, body.address);
  }

  @Get()
  findAll() {
    return this.walletAddressService.findAllWalletAddresses();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.walletAddressService.findWalletAddressById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.walletAddressService.updateWalletAddress(id, body.userId, body.address);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.walletAddressService.deleteWalletAddress(id);
  }
}
