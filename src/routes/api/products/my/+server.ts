import { RequestHandler } from "@sveltejs/kit";
import productService from "../../../../lib/services/product.service";
import { json } from "stream/consumers";
import { error } from "console";

export const GET:RequestHandler = async ({cookies,locals})=>{
    if(!locals.user){
        return error(401,"UnAuthorized");
    }
    const myProducts = await productService.getMyProducts(locals.user.userId);
    return json(myProducts);
}