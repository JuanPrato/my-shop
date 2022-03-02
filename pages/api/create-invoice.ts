import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { fetchQuery } from 'sanity';
import { Item } from 'shared/types/Item';
import { CartItem } from 'shared/types/CartItem';

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN!,
  sandbox: true,
  
});

type Data = {
  id: string,
  init_point: string
}

const productsQuery = `*[_type == 'product'] {
  _id,
  title,
  defaultProductVariant {
    images[] {
      asset-> {
        url
      }
    },
    price
  },
  categories[]-> {
    title
  }
}`;

function productMapper (p: any): Item { 
  return {
    id: p._id,
    name: p.title,
    price: p.defaultProductVariant.price,
    categories: p.categories.map((c: any) => c.title),
    photoUrl: p.defaultProductVariant.images[0].asset.url
  }

}

function createPreference(items: CartItem[]) : CreatePreferencePayload {
  return {
    items: items.map(i => ({
      title: i.name,
      unit_price: i.price,
      quantity: i.quantity
    })),
    expires: true,
    // expiration_date_to: new Date(Date.now() + 1000 * 60 * 10).toISOString(),
    back_urls: {
      success: 'http://localhost:3000/payment',
      failure: 'http://localhost:3000',
      pending: 'http://localhost:3000'
    },
    auto_return: 'approved',
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  try {

    const { method } = req;
    const { items }: { items: { id: string, quantity: number }[] } = JSON.parse(req.body);

    if (method !== 'POST') return;

    const sanityProducts = await fetchQuery(productsQuery);
    const products: Item[] = sanityProducts.map(productMapper)

    const r = await mercadopago.preferences
      .create(createPreference(items.map(i => {
        const p = products.find(p => p.id === i.id)!;
        return {
          ...p,
          quantity: i.quantity
        };
      })));

    res.status(200).json({ id: r.body.id, init_point: r.body.init_point });
  } catch (e) {
    console.error(e);
    return res.status(501);
  }
  
}
