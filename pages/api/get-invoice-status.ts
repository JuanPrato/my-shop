import { NextApiRequest, NextApiResponse } from "next";
import mercadopago from 'mercadopago';

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN!,
    sandbox: true,

});  

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    
    const id = req.query.id as string;

    try {
  
        const payment = await mercadopago.payment.findById(Number(id));

        res.status(200).json({
            status: payment.status,

        });
    } catch (e) {
        console.error(e);
        return res.status(501);
    }
    
  }
  