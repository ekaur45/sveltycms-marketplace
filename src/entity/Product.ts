import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './User';

@Entity('Products')
export class Product {

  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @Column({ type: 'nvarchar' })
  title: string;

  @Column({ type: 'nvarchar' })
  description: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'nvarchar', length: 2000 })
  imageUrl: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
  @DeleteDateColumn()
  deleteDate: Date | null;
}
