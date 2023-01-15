import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, Like, Posts } from 'src/database/entities';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly usersService: UsersService,
  ) {}

  public async created(createPostDto: CreatePostDto) {
    const verifyUser = await this.usersService.findById(createPostDto.userId);
    const newPost = new Posts();
    newPost.title = createPostDto.title;
    newPost.content = createPostDto.content;
    newPost.user = verifyUser;
    await this.postsRepository.save(newPost);
    return newPost;
  }

  public async findAll() {
    const find = await this.postsRepository.find({
      relations: ['user', 'likes', 'comments'],
    });
    return find;
  }

  public async findOnePost(idPost: string) {
    const find = await this.postsRepository.findOne({
      where: { id: idPost },
      relations: ['user', 'likes'],
    });
    if (!find) {
      throw new NotFoundException(`this id ${idPost} does not exist`);
    }

    return find;
  }

  public async findAllPostsByIdUser(idUser: string) {
    const find = await this.postsRepository.find({
      where: { user: idUser },
      relations: ['user', 'likes'],
    });
    return find;
  }

  public async findPostsByTitle(title: string) {
    const find = await this.postsRepository.find({
      where: { title: title },
      relations: ['user', 'likes'],
    });
    if (!find) {
      throw new NotFoundException(`this title ${title} does not exist`);
    }
    return find;
  }

  public async likePosts(idPost: string) {
    const find = await this.findOnePost(idPost);
    const newLike = new Like();
    newLike.post = find;
    newLike.email = find.user.email;
    await this.likesRepository.save(newLike);
    return newLike;
  }

  public async updated(idPost: string, { content, title }: UpdatePostDto) {
    const findPost = await this.findOnePost(idPost);
    findPost.content = content;
    findPost.title = title;
    const save = await this.postsRepository.save(findPost);
    return save;
  }

  public async deleted(idPost: string) {
    const findPost = await this.postsRepository.findOne(idPost);
    if (!findPost) {
      throw new NotFoundException(`this id ${idPost} does not exist`);
    }
    const findLikes = await this.likesRepository.find({
      where: { post: idPost },
    });
    const findComments = await this.commentRepository.find({
      where: { post: idPost },
    });
    if (findLikes || findComments) {
      for (const iterator of findLikes) {
        const removeLikes = await this.likesRepository.delete(iterator);
      }
      for (const iterator of findComments) {
        const removeLikes = await this.likesRepository.delete(iterator);
      }
    }
    const remove = await this.postsRepository.delete(findPost);
    return `post ${findPost.title} deleted`;
  }
}
