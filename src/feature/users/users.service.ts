import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async created(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 11);
    createUserDto.password = hash;
    const newU = await this.usersRepository.save(createUserDto);
    return newU;
  }

  public async findAll() {
    const find = await this.usersRepository.find();
    return find;
  }

  public async findOne(idUser: string) {
    const find = await this.usersRepository.find();
    return find;
  }

  public async findByEmail(email: string) {
    const find = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!find) {
      throw new NotFoundException(`this user ${email} does not exist`);
    }
    return find;
  }

  public async findById(idUser: string) {
    const find = await this.usersRepository.findOne({
      where: { id: idUser },
    });
    if (!find) {
      throw new NotFoundException(`this user ${idUser} does not exist`);
    }
    return find;
  }

  public async updated(idUser: string, { email, username }: UpdateUserDto) {
    const find = await this.findById(idUser);
    find.email = email;
    find.username = username;
    const newU = await this.usersRepository.save(find);
    return newU;
  }

  public async deleted(idUser: string) {
    const find = await this.findById(idUser);
    const remove = await this.usersRepository.delete(find);
    return `user ${find.email} remove`;
  }
}
