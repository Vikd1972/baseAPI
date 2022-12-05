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
    nullable: true,
  })
  book: Book;

  @ManyToOne(() => User, (User) => User.rating, { nullable: true })
  user: User;
}

export default Rating;
