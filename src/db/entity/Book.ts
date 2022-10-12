import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
  JoinColumn,
  Column
} from "typeorm"

import User from "./User"
import Assessment from "./Assessment"
import  Genre from "./Genre"

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  author: string

  @Column({ nullable: true })
  pathToCover: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  releasedAt: Date;

  @Column({ nullable: true })
  paperbackPrice: string

  @Column({ nullable: true })
  paperbackQuantity: string

  @Column({ nullable: true })
  hardcoverPrice: string

  @Column({ nullable: true })
  hardcoverQuantity: string

  @ManyToMany(() => User, (User) => User.favorites)
  @JoinTable()
  users: User[]

  @OneToMany(() => Assessment, (Assessment) => Assessment.book, {
    cascade: true,
  })
  @JoinColumn()
  assessment: Assessment[];

  @ManyToMany(() => Genre, (Genre) => Genre.id, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];
}

export default Book