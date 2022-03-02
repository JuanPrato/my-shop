import { NextApiHandler } from "next/types";
import { fetchQuery } from "sanity";

const handler: NextApiHandler  = async (req, res) => {
    try {    
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
        
        const categoriesQuery = `
            *[_type == 'category'] {
            _id,
            title
            }
        `;
        
        const products = await fetchQuery(productsQuery);
        const categories = await fetchQuery(categoriesQuery);

        res.status(200).json({
            products,
            categories
        });
    } catch(e) {
        res.status(500);
    }
}
  
export default handler;