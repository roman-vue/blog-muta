import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Posts } from 'src/database/entities';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('created')
  public async created(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.created(createUserDto);
    return data;
  }

  @Get('all')
  public async findAll() {
    const data = await this.usersService.findAll();
    return data;
  }

  @Get('find-by-id/:idUser')
  public async findOne(@Param('idUser') idUser: string) {
    const data = await this.usersService.findById(idUser);
    return data;
  }

  @Get('find-by-email/:email')
  public async findEmail(@Param('email') email: string) {
    const data = await this.usersService.findByEmail(email);
    return data;
  }

  @Put('updated/:idUser')
  public async updated(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.usersService.updated(idUser, updateUserDto);
    return data;
  }

  @Delete('deleted/:idUser')
  public async deleted(@Param('idUser') idUser: string) {
    const data = await this.usersService.deleted(idUser);
    return data;
  }
}
