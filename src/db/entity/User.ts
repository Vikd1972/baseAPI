import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

import Book from './Book';
import Comment from './Comment';
import Cart from './Cart';
import Rating from './Rating';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: true })
  photoFilePath: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  password?: string;

  @ManyToMany(() => Book, (book) => book.users, {
    cascade: true,
    eager: true,
  })
  favorites?: Book[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  comment: Comment[];

  @OneToMany(() => Cart, (Cart) => Cart.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cart: Cart[];

  @OneToMany(() => Rating, (Rating) => Rating.user, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  rating: Rating[];
}

export default User;
