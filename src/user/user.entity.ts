import { OneToMany } from "@mikro-orm/core";
import { Collection } from "@mikro-orm/core";
import { Entity, Enum, EnumType, PrimaryKey, Property } from "@mikro-orm/core";
import { Task } from "../task/task.entity"
import { v4 as uuid } from 'uuid';

export enum GenderEnum {
    Male = 'male',
    female = 'female'
}
@Entity()
export class User {
    @PrimaryKey({ type: 'uuid' })
    id: string = uuid();

    @Property({ type: String })
    firstname: string;

    @Property({ type: String })
    lastname: string;

    @Property({ type: Number })
    age: number;

    @Enum({type: EnumType, items: () => GenderEnum})
    gender: GenderEnum

    @Property({ type: 'date' })
    createdAt = new Date();
    
    @Property({ type: String})
    jobTitle: string;

    @OneToMany(() => Task, task => task.user)
    tasks = new Collection<Task>(this);
}
