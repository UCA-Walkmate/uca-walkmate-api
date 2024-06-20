import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'name' })
    description: string;

    @Column({ name: 'location_id' }) 
    // TODO: FK
    locationId: number;

}
