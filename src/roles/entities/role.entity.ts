import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    users: User;
}
