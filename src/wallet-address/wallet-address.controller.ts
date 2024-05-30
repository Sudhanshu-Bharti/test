import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('wallet-address')
@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet address' })
  @ApiResponse({ status: 201, description: 'The wallet address has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async create(@Body() createWalletAddressDto: CreateWalletAddressDto) {
    try {
      return await this.walletAddressService.createWalletAddress(createWalletAddressDto.userId, createWalletAddressDto.address);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallet addresses' })
  @ApiResponse({ status: 200, description: 'Return all wallet addresses.' })
  findAll() {
    return this.walletAddressService.findAllWalletAddresses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a wallet address by ID' })
  @ApiResponse({ status: 200, description: 'Return a wallet address.' })
  @ApiResponse({ status: 404, description: 'Wallet address not found.' })
  findOne(@Param('id') id: number) {
    return this.walletAddressService.findWalletAddressById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a wallet address' })
  @ApiResponse({ status: 200, description: 'The wallet address has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Wallet address not found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: number, @Body() createWalletAddressDto: CreateWalletAddressDto) {
    try {
      return await this.walletAddressService.updateWalletAddress(id, createWalletAddressDto.userId, createWalletAddressDto.address);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a wallet address' })
  @ApiResponse({ status: 200, description: 'The wallet address has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Wallet address not found.' })
  remove(@Param('id') id: number) {
    return this.walletAddressService.deleteWalletAddress(id);
  }
}
