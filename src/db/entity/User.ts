import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
  Column
} from "typeorm"

import Book from "./Book"
import Assessment from "./Assessment"
import Cart from "./Cart"


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
    eager: true,
  })
  favorites: Book[]

  @OneToMany(() => Assessment, (Assessment) => Assessment.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  assessment: Assessment[]

  @OneToMany(() => Cart, (Cart) => Cart.user, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  cart: Cart[];
}

export default User