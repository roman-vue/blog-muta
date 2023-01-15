import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/database/entities';
import { PostModule } from '../post/post.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [JwtModule, PostModule, TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
