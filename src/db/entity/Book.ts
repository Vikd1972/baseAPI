import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  JoinColumn,
  Column,
} from 'typeorm';

import User from './User';
import Comment from './Comment';
import Genre from './Genre';
import Cart from './Cart';
import Rating from './Rating';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  pathToCover: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  releasedAt: Date;

  @Column({ nullable: true })
  paperbackPrice: number;

  @Column({ nullable: true })
  paperbackQuantity: number;

  @Column({ nullable: true })
  hardcoverPrice: number;

  @Column({ nullable: true })
  hardcoverQuantity: number;

  @Column({ nullable: true })
  isNew: boolean;

  @Column({ nullable: true })
  isBestseller: boolean;

  @Column({ nullable: true, type: 'real' })
  averageRating: number;

  @ManyToMany(() => User, (user) => user.favorites)
  @JoinTable()
  users: User[];

  @ManyToMany(() => Genre, (genre) => genre.id, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Comment, (Comment) => Comment.book, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  comment: Comment[];

  @OneToMany(() => Cart, (Cart) => Cart.book, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  cart: Cart[];

  @OneToMany(() => Rating, (Rating) => Rating.book, {
    cascade: true,
  })
  @JoinColumn()
  rating: Rating[];
}

export default Book;
