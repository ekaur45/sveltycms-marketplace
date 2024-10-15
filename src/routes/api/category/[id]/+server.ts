import { RequestHandler } from "@sveltejs/kit";
import { AppDataSource } from "../../../../data-source";
import { Category } from "../../../../entity/Category";

export const DELETE:RequestHandler = async ({params}) => {
    const categoryId = params['id'];
    const categoryRepo = AppDataSource.getRepository(Category);
    await categoryRepo.softDelete(categoryId);
    return new Response("",{status:200});
}