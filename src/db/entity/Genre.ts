import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Book from './Book';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string

  @ManyToMany(() => Book, (book) => book.genres)
  books: Genre[];
}

export default Genre