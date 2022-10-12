import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column
} from "typeorm"

import Book from "./Book"
import User from "./User"

@Entity()
export class Assessment {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  rating: number

  @Column({ nullable: false })
  comments: string

  @ManyToOne(() => Book, (Book) => Book.assessment, {
    nullable: false,
  })
  book: Book;

  @ManyToOne(() => User, (User) => User.assessment, {
    nullable: false,
  })
  user: User;
}

export default Assessment