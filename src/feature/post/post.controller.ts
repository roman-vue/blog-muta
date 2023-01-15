import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { AccessGuard } from 'src/guards/access.guard';
@ApiTags('POSTS')
@UseGuards(AccessGuard)
@ApiBearerAuth()
@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Post('created-post')
  public async created(@Body() createPostDto: CreatePostDto) {
    const data = await this.postsService.created(createPostDto);
    return data;
  }

  @Get('all-post')
  public async allPost() {
    const data = await this.postsService.findAll();
    return data;
  }

  @Get('post-by-idPost/:idPost')
  public async postById(@Param('idPost') idPost: string) {
    const data = await this.postsService.findOnePost(idPost);
    return data;
  }

  @Get('all-post-by-idUser/:idUser')
  public async postByIdUser(@Param('idUser') idUser: string) {
    const data = await this.postsService.findAllPostsByIdUser(idUser);
    return data;
  }

  @Get('post-by-title/:title')
  public async postByTitle(@Param('title') title: string) {
    const data = await this.postsService.findPostsByTitle(title);
    return data;
  }

  @Patch('like-to-post/:idPost')
  public async likeToPost(@Param('idPost') idPost: string) {
    const data = await this.postsService.likePosts(idPost);
    return data;
  }

  @Put('updated/:idPost')
  public async updated(
    @Param('idPost') idPost: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const data = await this.postsService.updated(idPost, updatePostDto);
    return data;
  }

  @Delete('deleted/:idPost')
  public async deleted(@Param('idPost') idPost: string) {
    const data = await this.postsService.deleted(idPost);
    return data;
  }
}
