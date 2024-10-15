import { AppDataSource } from "../../../data-source";
import { Category } from "../../../entity/Category";

export async function load (){
    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.find();
    
    return {
        categories:JSON.parse(JSON.stringify(categories))
    }
}