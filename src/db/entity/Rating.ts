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
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'real' })
  rating: number;

  @ManyToOne(() => Book, (Book) => Book.rating, {
    nullable: false,
  })
  book: Book;

  @ManyToOne(() => User, (User) => User.rating, {
    nullable: false,
  })
  user: User;
}

export default Rating;
