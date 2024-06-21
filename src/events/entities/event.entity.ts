import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'locationId', select: false })
    locationId: number;

    @ManyToOne(() => Location, (location) => location.events, { eager: true, })
    location: Location

}