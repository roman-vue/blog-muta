import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ default: 'this post changes my life' })
  @IsString()
  content: string;

  @ApiProperty({ default: 'f45f2649-babc-4132-9bd1-bff743af488d' })
  @IsUUID()
  postId: string;
}
