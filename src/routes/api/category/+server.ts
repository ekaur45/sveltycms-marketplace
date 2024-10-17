import { json, RequestHandler } from "@sveltejs/kit";
import { AppDataSource } from "../../../data-source";
import { Category } from "../../../entity/Category";
import { error } from "console";

export const GET: RequestHandler = async () => {
    const categoryRepo = AppDataSource.getRepository(Category);
    let categories = await categoryRepo.find({});
    return json(categories);
};

export const POST: RequestHandler = async ({ request }) => {
    const { name } = await request.json();
    if (!name) error(400,"Invalid request");


    await AppDataSource.manager.save(Category, { name });

    return json("Category added.");
};
