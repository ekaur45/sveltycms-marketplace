import { FindManyOptions, FindOptions, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Product";
import { User } from "../../entity/User";
import { Category } from "../../entity/Category";

class ProductService{
    private readonly productRepo : Repository<Product>;
    private readonly userRepo:Repository<User>;
    private readonly categoryRepo:Repository<Category>;
    constructor() {
        this.productRepo = AppDataSource.getRepository(Product)
        this.userRepo = AppDataSource.getRepository(User)
        this.categoryRepo = AppDataSource.getRepository(Category)
    }
    async addProduct(product:Partial<Product>){
        const user = await this.userRepo.findOne({where:{userId:product.userId}});
        const category = await this.categoryRepo.findOne({where:{categoryId:product.categoryId}});
        product.user = user;
        product.category = category;
        product.type = product.price == 0? 'free' : 'paid';
        return await this.productRepo.save(product);
    }

    async getMyProducts(userId:number){
        const products = await this.productRepo.find({where:{userId}});
        return JSON.parse(JSON.stringify(products));
    }

    async getProducts(options?:FindManyOptions<Product>){
        const products = await this.productRepo.find(options);
        return JSON.parse(JSON.stringify(products));
    }

    async getProductById(id:number){
        const product = await this.productRepo.findOne({where:{id}});
        return product;
    }

    async deleteProduct(id:number){
        return await this.productRepo.softDelete({id});
    }
}

const productService = new ProductService();
export default productService;