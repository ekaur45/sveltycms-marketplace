import { RequestHandler } from "@sveltejs/kit";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entity/User";

export const GET: RequestHandler = async()=>{

}
export const POST: RequestHandler = async({request,cookies})=>{
    debugger
    const body = await request.json();
    const {name,email,password} = body;
    const userRepo = await AppDataSource.getRepository(User);
    var user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = 'seller';
    await userRepo.save(user);
    const token = 'userid_'+user.userId;
    cookies.set('session',token,{
        path:"/",
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production'
    });
    return new Response("",{status:200});
}