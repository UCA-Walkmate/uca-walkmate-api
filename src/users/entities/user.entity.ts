import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/roles/entities/role.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'email' })
    email: number;

    @Column({ name: 'password' })
    password: number;

    // @Column({ name: 'role_id' })
    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    role: Role;

}
