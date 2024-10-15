import { Entity, Enum, EnumType, PrimaryKey, Property } from "@mikro-orm/core";
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
    test: string;

    @Property({ type: String })
    lastName: string;

    @Property({ type: Number })
    age: number;

    @Enum({type: EnumType, items: () => GenderEnum})
    gender: GenderEnum

    @Property({ type: 'date' })
    createdAt = new Date();
    
    @Property({ type: String})
    jobTitle: string;
}