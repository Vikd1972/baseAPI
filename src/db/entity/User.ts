import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  Column
} from "typeorm"

import Book from "./Book"
import Assessment from "./Assessment"


@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  fullname: string

  @Column({ nullable: false })
  email: string

  @Column({ nullable: true })
  photoFilePath: string

  @Column({ type: 'varchar', nullable: true, select: false })
  password?: string

  @ManyToMany(() => Book, (Book) => Book.users, {
    cascade: true,
  })
  favorites: Book[]

  @OneToMany(() => Assessment, (Assessment) => Assessment.user, {
    cascade: true,
  })
  @JoinTable()
  assessment: Assessment[];
}

export default User