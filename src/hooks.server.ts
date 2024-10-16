
import { redirect, type Handle } from '@sveltejs/kit';
import { AppDataSource } from './data-source';
import { User } from './entity/User';

export const handle: Handle = async ({ event, resolve }) => {
    if (!AppDataSource.isInitialized) {
        AppDataSource.initialize();
    }
    const session = event.cookies.get('session');
    if (session) {
        const userId = Number(session.split('_')[1]);
        const userRepo = await AppDataSource.getRepository(User);
        let user = await userRepo.findOne({where:{userId:userId}});
        user = JSON.parse(JSON.stringify(user));
        // Set session data for the request (could verify the token)
        event.locals.user = user; // Example user data
        // if(event.url.pathname == '/account/login' || event.url.pathname == '/account/create'){
        //     return redirect(301,'/');
        // }
      } else {
        event.locals.user = null;
      }
      
    // Custom logic before resolving the request
    const response = await resolve(event);
    // Custom logic after resolving the request
    return response;
};