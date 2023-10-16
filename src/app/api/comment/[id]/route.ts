import { NextResponse, type NextRequest } from "next/server";
import Comment from "@/models/Comment";
import User from "@/models/User";


import { connect } from '@/services/db';

export const GET = async (request: NextRequest,{ params }: { params: { id: string } }) => {
    await connect();
    const comment = await Comment.findOne({id:params['id']}).populate({
        path:'user',
        model:User
    }).exec();
    
    return NextResponse.json(comment)

}

export const PUT = async (request: NextRequest,{ params }: { params: { id: string } }) => {
    await connect();
    const comment = await Comment.findOne({id:params['id']});
    comment.isVerified = true;
    await comment.save()
    return NextResponse.json('comment was accepted')

}

export const DELETE = async (request: NextRequest,{ params }: { params: { id: string } }) => {
    await connect();
    
    await Comment.deleteOne({id:params['id']})

    return NextResponse.json('comment was deleted')

}