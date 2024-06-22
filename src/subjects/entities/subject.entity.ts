import { Location } from "src/locations/entities/location.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('subjects')
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'userId' })
    userId: number;

    @Column({ name: 'locationId' })
    locationId: number;

    @ManyToOne(() => User, (user) => user.subjects)
    user: User;
    
    @ManyToOne(() => Location, (location) => location.users)
    location: Location;

}
