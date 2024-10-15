import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, Unique, DeleteDateColumn } from 'typeorm';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column({type:'nvarchar',length:100})
  name: string;
  
  @DeleteDateColumn()
  deleteDate: Date | null;
}
