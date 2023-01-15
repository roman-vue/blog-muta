import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ default: 'this post changes my life' })
  @IsString()
  content: string;
}
