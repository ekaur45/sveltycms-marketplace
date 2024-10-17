import { json, RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async({request,cookies})=>{
    cookies.delete('session', { path: '/',httpOnly:true });
    return json('/account/login');
}