/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import Book from './Book';
import User from './User';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  commentData: Date;

  @ManyToOne(() => Book, (book) => book.comment, {
    nullable: false,
  })
  book: Book;

  @ManyToOne(() => User, (user) => user.comment, {
    nullable: false,
  })
  user: User;
}

export default Comment;
