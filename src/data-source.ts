import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Category } from "./entity/Category"
import { Order } from "./entity/Order"
import { Transaction } from "./entity/Transaction"
import { Product } from "./entity/Product"

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "test123",
    database: "sveltycsm-marketplace",
    synchronize: false,
    logging: true,
    entities: [User,Product,Category,Order,Transaction],
    migrations: ["./migration/*.ts"],
    subscribers: [],
})
