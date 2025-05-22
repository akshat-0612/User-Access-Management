import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Request } from './Request';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: 'Employee' | 'Manager' | 'Admin';

  @OneToMany(() => Request, request => request.user)
  requests!: Request[];
}
