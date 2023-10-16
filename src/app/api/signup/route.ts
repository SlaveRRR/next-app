import { NextResponse, type NextRequest } from "next/server";
import User from "@/models/User";
import { connect } from '@/services/db';


export const POST = async (request: NextRequest) => {
    await connect();
    const body = await request.json();
    const lastUser  = await User.find().sort('-id').limit(1).findOne()
    const lastId : number =  lastUser ? lastUser['id'] : 0
   
    body['id'] = lastId + 1
    console.log(body)
    await User.create(body)
    return NextResponse.json('user created')

}