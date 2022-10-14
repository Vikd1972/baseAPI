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

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  author: string

  @Column({ nullable: true })
  pathToCover: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  releasedAt: Date;

  @Column({ nullable: true })
  paperbackPrice: number

  @Column({ nullable: true })
  paperbackQuantity: number

  @Column({ nullable: true })
  hardcoverPrice: number

  @Column({ nullable: true })
  hardcoverQuantity: number

  @Column({ nullable: true })
  isNew: boolean

  @Column({ nullable: true })
  isBestseller: boolean

  @ManyToMany(() => User, (User) => User.favorites)
  @JoinTable()
  users: User[]

  @OneToMany(() => Assessment, (Assessment) => Assessment.book, {
    cascade: true,
  })
  @JoinTable()
  assessment: Assessment[];

  @ManyToMany(() => Genre, (genre) => genre.id, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];
}

export default Book