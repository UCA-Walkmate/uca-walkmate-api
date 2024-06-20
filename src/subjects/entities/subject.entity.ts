import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subjects')
export class Subject {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'user_id'})
    userId: number;

    @Column({name: 'location_id'})
    // TODO: FK
    locationId: number;

}
