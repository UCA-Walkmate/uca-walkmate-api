import { Event } from './../../events/entities/event.entity';
import { Point } from "geojson";
import { Category } from "src/categories/entities/category.entity";
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('locations')
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'geom', type: 'geometry', srid: 3857 })
    geom: Point;

    @Column({ name: 'OBJECTID' })
    objectId: number;

    @Column({ name: 'Id' })
    idAux: number;

    @Column({ name: 'name' })
    name: string;

    @ManyToOne(() => Category, (category) => category.locations, { eager: true, })
    category: Category;

    events: Event[];

    users: User[];
}
