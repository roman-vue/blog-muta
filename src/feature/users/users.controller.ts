import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Posts } from 'src/database/entities';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('created')
  public async created(@Body() createUserDto: CreateUserDto) {}

  @Get('all')
  public async findAll() {
    const data = await this.usersService;
    return data;
  }

  @Get('find-by-id/:idUser')
  public async findOne(@Param('idUser') idUser: string) {
    const data = await this.usersService;
    return data;
  }

  @Get('find-by-email/:email')
  public async findEmail(@Param('email') email: string) {
    const data = await this.usersService;
    return data;
  }

  @Put('updated/:idUser')
  public async updated(@Param('idUser') idUser: string) {
    const data = await this.usersService;
    return data;
  }

  @Delete('deleted/:idUser')
  public async deleted(@Param('idUser') idUser: string) {
    const data = await this.usersService;
    return data;
  }
}
