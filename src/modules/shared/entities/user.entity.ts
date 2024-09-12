import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('users') 
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: 'user' | 'admin'

    @Column({ nullable: true })
    picture_url: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string
}