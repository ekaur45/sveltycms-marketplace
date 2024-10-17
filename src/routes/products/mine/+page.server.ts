import { Load, redirect, ServerLoad } from "@sveltejs/kit";

export const load:ServerLoad = async({locals})=>{
    if(!locals.user){
        return redirect(302,'/products');
    }
}