import { Entity, Enum, EnumType, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../user/user.entity";
import { v4 as uuid } from 'uuid';

export enum TaskStatus {
    Planned = 'planned',
    InProgress = 'in-progress',
    Completed = 'completed',
    Cancelled = 'cancelled'
}
@Entity()
export class Task {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuid();

    @Property({ type: String })
    title: string;

    @Property({ type: 'text'})
    description: string;

    @Enum({type: EnumType, items: () => TaskStatus})
    status: TaskStatus

    @Property({ type: 'date' })
    from: Date;
    
    @Property({ type: 'date' })
    to: Date;

    @ManyToOne({ onDelete: 'cascade' })
    user: User;

}
