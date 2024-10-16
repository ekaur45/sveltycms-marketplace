import { redirect } from '@sveltejs/kit';

export async function load (obj:any){

  return {
    user: obj.locals.user
  };
};