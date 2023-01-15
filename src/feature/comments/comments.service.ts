import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/entities';
import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  public async createComment(createCommentDto: CreateCommentDto) {
    const findPost = await this.postService.findOnePost(
      createCommentDto.postId,
    );
    const newComment = new Comment();
    newComment.email = findPost.user.email;
    newComment.content = createCommentDto.content;
    newComment.post = findPost;
    const save = await this.commentsRepository.save(newComment);
    return newComment;
  }

  public async findCommentByIdPost(idPost: string) {
    const find = await this.commentsRepository.find({
      where: { post: idPost },
    });
    return find;
  }

  public async updated(idComment: string, { content }: UpdateCommentDto) {
    const find = await this.commentsRepository.findOne({
      where: { id: idComment },
    });
    if (!find) {
      throw new NotFoundException(`this comment ${idComment} does not exist`);
    }
    find.content = content;
    const save = await this.commentsRepository.save(find);
    return save;
  }

  public async deleted(idComment: string) {
    const find = await this.commentsRepository.findOne({
      where: { id: idComment },
    });
    if (!find) {
      throw new NotFoundException(`this comment ${idComment} does not exist`);
    }
    const remove = this.commentsRepository.delete(find);
    return `comment ${find.content} delete`;
  }
}
