import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  totalPrice: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.order)
    transactions: Transaction[];

    @DeleteDateColumn()
    deleteDate: Date | null;
}
