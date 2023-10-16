import { NextResponse, type NextRequest } from "next/server";
import Article from "@/models/Article";
import Comment from "@/models/Comment";
import User from "@/models/User";
import { connect } from '@/services/db';


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connect();

    const res = await Article.findOne({ id: Number(params.id) }, null, {
        upsert: false
    }).populate(
        {
            path: 'comments',
            model:Comment,
            populate: { path: 'user', model:User  }
        }).exec()

   
    return NextResponse.json(res)

}

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connect();
    const body = await request.json();
   
    const url = request.nextUrl.clone();

    url.pathname = `/article/${body['id']}`
    await Article.updateOne({ id: Number(params.id) }, body);

    return NextResponse.json('updated')
}

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
    await connect();
    await Article.deleteOne({ id: Number(params.id) });

    return NextResponse.json('was deleted')
}




