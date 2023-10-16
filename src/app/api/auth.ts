// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: string
// }
export const GET = () =>{
  
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log(req.body)
   res.status(201).send(req.body)
}

// title  - string; required!
// shortDesc - string; required!
// desc - string
// datePublic - data;
