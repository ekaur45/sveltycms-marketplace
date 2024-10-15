import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({type:'nvarchar'})
  name: string;

  @Column({ unique: true,type:'varchar',length:200 })
  email: string;
  @Column({type:'nvarchar'})
  password: string;

  @Column({ type: 'enum', enum: ['buyer', 'seller', 'admin'], default: 'buyer' })
  role: 'buyer' | 'seller' | 'admin';

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];


  @DeleteDateColumn()
  deleteDate: Date | null;
}