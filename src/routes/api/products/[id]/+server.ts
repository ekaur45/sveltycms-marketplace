import type { RequestHandler } from '@sveltejs/kit';

import { query } from '$lib/database/db';
import type { Product } from '$lib/types/product';

export const GET: RequestHandler = async ({ params }) => {
  const product = await query<Product>('SELECT * FROM Products WHERE productId = ?', [params.id]);
  if (product.length > 0) {
    return { body: product[0] };
  }
  return { status: 404, body: { error: 'Product not found' } };
};

export const DELETE: RequestHandler = async ({ params }) => {
  await query('DELETE FROM Products WHERE productId = ?', [params.id]);
  return { status: 204 };
};
