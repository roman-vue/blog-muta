import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './feature/auth/auth.module';
import { UsersModule } from './feature/users/users.module';
import { PostModule } from './feature/post/post.module';
import { CommentsModule } from './feature/comments/comments.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, PostModule, CommentsModule, JwtModule],
})
export class AppModule {}
