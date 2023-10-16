import { NextResponse, type NextRequest } from "next/server";
import Article from "@/models/Article";
import { connect } from '@/services/db';
import { mailer } from "@/services/mailer";

export const POST = async (request: NextRequest) => {
    await connect();
    
    const body = await request.json();
    const lastArticle = await Article.find().sort('-id').limit(1).findOne();
    const id = lastArticle ? lastArticle['id'] : 0
    body['id'] = id + 1
    await Article.create(body)
    // mailer senlder
    // await mailer({
    //     from:process.env.MAIL as string,
    //     subject:'Creaing new Article',
    //     text:`Hello, we create new Article with title ${body['title']}`,
    //     to:'vyacheslav1410@yandex.ru'
    // })
    return NextResponse.json('article was created')

}







