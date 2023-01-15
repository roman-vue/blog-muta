import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like, Posts, Comment } from 'src/database/entities';
import { UsersModule } from '../users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    TypeOrmModule.forFeature([Posts, Like, Comment]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
