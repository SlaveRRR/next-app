import { NextResponse, type NextRequest } from "next/server";
import Article from "@/models/Article";
import { connect } from '@/services/db';

export const GET = async (request: NextRequest) => {
    await connect();
    const page = Number(request.nextUrl.searchParams.get('page')) ?? 1
    const limit = Number(request.nextUrl.searchParams.get('limit')) ?? 10
   
 
    const skip = (page - 1) * limit
   
    const res = await Article.find().limit(limit).skip(skip)
    const max =  Math.ceil(await Article.count() / limit);
   
    return NextResponse.json([res,max])

}





// export const POST = async (request: NextRequest) => {
//   const req = await request.json();

//   return NextResponse.json(req, {
//     status: 201
//   })

// }



