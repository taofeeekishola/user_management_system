import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({type: 'boolean', default: false})
    status?: boolean;

    @CreateDateColumn({type:'date'})
    registerDate: Date
}

