import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ default: 'how save the world?' })
  @IsString()
  title: string;
  @ApiProperty({ default: '💥' })
  @IsString()
  content: string;
  @ApiProperty({ default: 'c401f3fb-032d-4431-8a41-215f11dd7435' })
  @IsUUID()
  userId: string;
}
