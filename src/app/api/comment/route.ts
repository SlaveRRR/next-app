import { NextResponse, type NextRequest } from "next/server";
import Comment from "@/models/Comment";
import User from "@/models/User";
import Article from "@/models/Article";

import { connect } from '@/services/db';
import { mailer } from "@/services/mailer";


export const POST = async (request: NextRequest) => {
    await connect();
    
    const body = await request.json();
    const author = await User.findOne({id:body['userId']});
    const article = await Article.findOne({id:body['articleId']});
    const lastComment = await Comment.find().sort('-id').limit(1).findOne();
    const id = lastComment ? lastComment['id'] : 0
    body['id'] = id + 1
    
    const comment = await Comment.create({
        id:body['id'],
        message:body['message'],
        user:author._id
       
    });
   
    article.comments.push(comment)
    await article.save()
    
    await mailer({
        from:process.env.MAIL as string,
        subject:'Creaing new Comment',
        text:`Hello, user ${author.name} create new comment.\n Moderate it - ${process.env.NEXTAUTH_URL}/moderate/?id=${comment.id}`,
        to:'vyacheslav1410@yandex.ru'
    })
    return NextResponse.json('comment was created')

}









