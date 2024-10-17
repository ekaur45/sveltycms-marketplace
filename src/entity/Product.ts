import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './User';
import { Category } from "./Category";

@Entity('Products')
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId:number;



  @Column({ type: 'nvarchar' })
  title: string;

  @Column({ type: 'nvarchar' })
  description: string;


  @Column({type:'nvarchar'})
  summary:string;


  @Column({ type: 'decimal', precision: 14, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'nvarchar' })
  fileUrl: string;

  @Column({ type: 'nvarchar', length: 2000 })
  imageUrl: string;

  @Column({type:'enum',enum:['Free','Paid']})
  type: 'free'|'paid';


  @ManyToOne(() => User, (user) => user.products)
  user: User;
  
  @ManyToOne(() => Category, (cat) => cat.products)
  category:Category

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
  @DeleteDateColumn()
  deleteDate: Date | null;
}
