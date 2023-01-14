import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
@ApiTags('POSTS')
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
    updatePostDto: UpdatePostDto,
  ) {
    const data = await this.postsService;
    return data;
  }

  @Delete('like-to-post/:idPost')
  public async deleted(@Param('idPost') idPost: string) {
    const data = await this.postsService;
    return data;
  }
}
