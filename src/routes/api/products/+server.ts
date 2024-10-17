import { json, type RequestHandler } from '@sveltejs/kit';

import { AppDataSource } from '../../../data-source';
import { Product } from '../../../entity/Product';
import productService from '../../../lib/services/product.service';
import { error } from 'console';
import {writeFileSync} from 'fs';
export const GET: RequestHandler = async ({cookies}) => {
  
  let products = await productService.getProducts();
  return json(products);
};

export const POST: RequestHandler = async ({ request,cookies }) => {
  
  const session = cookies.get('session');
  let userId = 0;
  if(session){
    userId = Number(session.split('_')[1]);
  }

  if(!userId){
    return error(302,"/account/login")
  }
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file) {
    return error(400,"No file attached.");
  }
  console.log(`Received file: ${file.name}`);

  // For example, if you wanted to read its contents:
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileName = (+ new Date())+file.name;
  writeFileSync(`./saved-files/${fileName}`, buffer);
  // const { title, description, price, categoryId, stock, imageUrl,summary} = await request.json();
  const title = formData.get('title');
  const description = formData.get('description');
  const price = formData.get('price');
  const categoryId = formData.get('categoryId');
  const imageUrl = formData.get('imageUrl');
  const summary = formData.get('summary');

  if(!(title&&description&&categoryId&&userId)) error(400,"Invalid request");

  await productService.addProduct({title,description,price,categoryId,userId,summary,fileUrl:fileName});

  return json("Product added.");
};