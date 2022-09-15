import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    email: string

    @Column({ type: 'date' })
    dob: string

    @Column({ nullable: true })
    isAdmin: boolean

    @Column()
    hash: string
}

export default User