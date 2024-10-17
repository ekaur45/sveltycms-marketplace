import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, Unique, DeleteDateColumn, OneToMany } from 'typeorm';
import { Product } from "./Product";

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({type:'nvarchar',length:100})
  name: string;
  
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @DeleteDateColumn()
  deleteDate: Date | null;
}
