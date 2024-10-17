export class UserDto{
    userId: number;
    name: string;
    email: string;
    password: string;
    role: 'buyer' | 'seller' | 'admin';
    createdAt: Date;
    // products: Product[];
    // orders: Order[];
    deleteDate: Date | null;
}