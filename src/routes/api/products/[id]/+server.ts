import { json, type RequestHandler } from '@sveltejs/kit';


import { error } from 'console';
import productService from '../../../../lib/services/product.service';

export const GET: RequestHandler = async ({ params }) => {
  console.log(params);
  const product = await productService.getProductById(Number(params.id))
  if (!product) {
    return error(404,"Product not found");
  }
  return json({ ...product });
};

export const DELETE: RequestHandler = async ({ params }) => {
  await productService.deleteProduct(Number(params.id));
  return json("Deleted.")
};
