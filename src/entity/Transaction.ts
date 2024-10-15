import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Order } from './Order';

@Entity('Transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @ManyToOne(() => Order, (order) => order.transactions)
  order: Order;

  @Column({ type: 'enum', enum: ['credit_card', 'paypal', 'stripe'] })
  paymentMethod: 'credit_card' | 'paypal' | 'stripe';

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'] })
  status: 'pending' | 'completed' | 'failed';

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @DeleteDateColumn()
  deleteDate: Date | null;
}
