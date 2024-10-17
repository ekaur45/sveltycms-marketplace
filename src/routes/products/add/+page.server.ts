import { redirect } from "@sveltejs/kit";
import { AppDataSource } from "../../../data-source";
import { Category } from "../../../entity/Category";

export async function load ({locals}){
    if(!locals.user){
        return redirect(302,'/account/login');
    }
    const categoryRepo = AppDataSource.getRepository(Category);
    const categories = await categoryRepo.find();
    
    return {
        categories:JSON.parse(JSON.stringify(categories))
    }
}