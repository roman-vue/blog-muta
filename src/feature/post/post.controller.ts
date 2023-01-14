import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('POSTS')
@Controller('post')
export class PostController {}
