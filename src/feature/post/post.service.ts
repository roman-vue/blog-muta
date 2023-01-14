import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Posts } from 'src/database/entities';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    private readonly usersService: UsersService,
  ) {}

  public async created(createPostDto: CreatePostDto) {}
}
