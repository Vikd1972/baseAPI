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

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  author: string;

  @Column({ nullable: true, type: 'varchar' })
  pathToCover: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ nullable: true, type: 'date' })
  releasedAt: Date;

  @Column({ nullable: true, type: 'integer' })
  paperbackPrice: number;

  @Column({ nullable: true, type: 'integer' })
  paperbackQuantity: number;

  @Column({ nullable: true, type: 'integer' })
  hardcoverPrice: number;

  @Column({ nullable: true, type: 'integer' })
  hardcoverQuantity: number;

  @Column({ nullable: true, type: 'boolean' })
  isNew: boolean;

  @Column({ nullable: true, type: 'boolean' })
  isBestseller: boolean;

  @Column({ nullable: true, type: 'real' })
  averageRating: number;

  @ManyToMany(() => User, (user) => user.favorites, {
    nullable: true,
  })
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
  })
  @JoinColumn()
  comment: Comment[];

  @OneToMany(() => Cart, (Cart) => Cart.book, {
    cascade: true,
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
