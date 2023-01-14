import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like, Posts } from 'src/database/entities';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Posts, Like])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
