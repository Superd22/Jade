import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


/**
 * An "Event" in Jade describes a type of gameplay that wants to be played at a given date
 */
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    /** date at which we want to hold this event */
    @Column()
    date: Date;
}
