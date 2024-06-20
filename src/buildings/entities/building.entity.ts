import { MultiPolygon } from "geojson";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('buildings')
export class Building {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'geom', type: 'geometry', srid: 3857 })
    geom: MultiPolygon;

    @Column({ name: 'OBJECTID' })
    objectId: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'Shape__Area', type: 'double precision' })
    shapeArea: number;

    @Column({ name: 'Shape__Length', type: 'double precision' })
    shapeLength: number;

    @Column({ name: 'location_id' })
    // TODO: FK
    locationId: number;

}
