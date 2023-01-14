import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({ default: 'how save the world?' })
  @IsString()
  title: string;
  @ApiProperty({ default: '💥' })
  @IsString()
  content: string;
}
