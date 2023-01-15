import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { AccessGuard } from 'src/guards/access.guard';
@ApiTags('COMMENTS')
@UseGuards(AccessGuard)
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post('created-comment')
  public async createComment(@Body() createCommentDto: CreateCommentDto) {
    const data = await this.commentsService.createComment(createCommentDto);
    return data;
  }

  @Get('comment-by-idPost/:idPost')
  public async getByPostId(@Param('idPost') idPost: string) {
    const data = await this.commentsService.findCommentByIdPost(idPost);
    return data;
  }

  @Put('updated/:idComment')
  public async updated(
    @Param('idComment') idComment: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const data = await this.commentsService.updated(
      idComment,
      updateCommentDto,
    );
    return data;
  }

  @Delete('deleted/:idComment')
  public async deleted(@Param('idComment') idComment: string) {
    const data = await this.commentsService.deleted(idComment);
    return data;
  }
}
