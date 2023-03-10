import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../Users/user.entity';
import { Comment } from '../Comments/comment.entity';
import { Like } from '../Likes';

@Entity()
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne((type) => User, (user) => user.post)
  user: User;

  @OneToMany((type) => Comment, (comments) => comments.post, { cascade: true })
  comments: Comment[];

  @OneToMany((type) => Like, (likes) => likes.post, { cascade: true })
  likes: Like[];
}
