import type { RequestHandler } from '@sveltejs/kit';

import { AppDataSource } from '../../../data-source';
import { Product } from '../../../entity/Product';

export const GET: RequestHandler = async () => {
  const productRepo = AppDataSource.getRepository(Product);
  let products = await productRepo.find({});

  //const products = await query<Product>('SELECT * FROM Products');
  return new Response(JSON.stringify([...products ]),{status:200,headers:{
    "content-type":"application/json"
 }});
};

export const POST: RequestHandler = async ({ request }) => {
  const { title, description, price, categoryId, userId, stock, imageUrl} = await request.json();
  if(!(title&&description&&price&&categoryId&&userId&&stock)) new Response("",{status:400});


  const productRepository = AppDataSource.manager.save(Product,{title, description, price, categoryId, userId, stock,imageUrl });
  // await productRepository.save({
    
    
  // });  
  return new Response("",{ status: 201 });
};