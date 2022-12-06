import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
  Column,
} from 'typeorm';

import Book from './Book';
import Comment from './Comment';
import ItemInCart from './ItemInCart';
import Rating from './Rating';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  fullname: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  photoFilePath: string;

  @Column({ type: 'varchar', nullable: true, select: false })
  password?: string;

  @ManyToMany(() => Book, (book) => book.users, { nullable: true, cascade: true })
  @JoinTable()
  favorites?: Book[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  @JoinColumn()
  comment: Comment[];

  @OneToMany(() => ItemInCart, (ItemInCart) => ItemInCart.user, { cascade: true })
  @JoinColumn()
  cart: ItemInCart[];

  @OneToMany(() => Rating, (rating) => rating.user, { cascade: true })
  @JoinColumn()
  rating: Rating[];
}

export default User;
