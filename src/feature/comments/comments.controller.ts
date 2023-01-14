import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('COMMENTS')
@Controller('comments')
export class CommentsController {}
