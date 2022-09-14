import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    fullname: string

    @Column({ nullable: true })
    email: string

    @Column({ type: 'date', nullable: true })
    dob: string;
}

export default User