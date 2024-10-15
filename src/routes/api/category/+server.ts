import { RequestHandler } from "@sveltejs/kit";
import { AppDataSource } from "../../../data-source";
import { Category } from "../../../entity/Category";

export const GET: RequestHandler = async () => {
    const categoryRepo = AppDataSource.getRepository(Category);
    let categories = await categoryRepo.find({});

    //const products = await query<Product>('SELECT * FROM Products');
    return new Response(JSON.stringify([...categories]), {
        status: 200, headers: {
            "content-type": "application/json"
        }
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const { name } = await request.json();
    if (!name) new Response("", { status: 400 });


    await AppDataSource.manager.save(Category, { name });

    return new Response("", { status: 201 });
};
