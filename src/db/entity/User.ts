import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}

export default User