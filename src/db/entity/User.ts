import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    fullname: string

    @Column({ nullable: true })
    email: string

    @Column({ type: 'date' })
    dob: string

    @Column({ nullable: true })
    isAdmin: boolean

    @Column({ nullable: true })
    hash: string
}

export default User