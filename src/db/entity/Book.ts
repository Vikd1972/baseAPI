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
import ItemInCart from './ItemInCart';
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

  @Column({ nullable: true, type: 'real' })
  paperbackPrice: number;

  @Column({ nullable: true, type: 'integer' })
  paperbackQuantity: number;

  @Column({ nullable: true, type: 'real' })
  hardcoverPrice: number;

  @Column({ nullable: true, type: 'integer' })
  hardcoverQuantity: number;

  @Column({ nullable: true, type: 'boolean' })
  isNew: boolean;

  @Column({ nullable: true, type: 'boolean' })
  isBestseller: boolean;

  @Column({ nullable: true, type: 'real' })
  averageRating: number;

  @Column({ nullable: true, type: 'real' })
  personalRating: number;

  @ManyToMany(() => User, (user) => user.favorites, { nullable: true })
  users: User[];

  @ManyToMany(() => Genre, (genre) => genre.id, { cascade: true, eager: true })
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Comment, (Comment) => Comment.book, { cascade: true })
  @JoinColumn()
  comment: Comment[];

  @OneToMany(() => ItemInCart, (ItemInCart) => ItemInCart.book, { cascade: true })
  @JoinColumn()
  cart: ItemInCart[];

  @OneToMany(() => Rating, (Rating) => Rating.book, { cascade: true })
  @JoinColumn()
  rating: Rating[];
}

export default Book;
