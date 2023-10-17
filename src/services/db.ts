import Article from '@/models/Article'
import Comment from '@/models/Comment'
import User from '@/models/User'
import mongoose from 'mongoose'
import { mailer } from './mailer'

const adminEmails = ['vyacheslav1410@yandex.ru']

const getData = (timeout:number) =>{
    setInterval(async () =>{
        const data = await Article.find().populate({
            path: 'comments',
            model:Comment,
            populate: { path: 'user', model:User  }
        })
        let text:string = '';
        data.forEach(el =>{
            text+=`Article: Title '${el.title}' url - ${process.env.NEXTAUTH_URL}/article/${el.id}. Count of comments ${el.comments.length}. Views ${el.views}\n\n`
        });
        await Promise.allSettled(adminEmails.map(el => mailer({
            from:process.env.MAIL as string,
            subject:'Statistics for day',
            text:text,
            to:el
        })))
           
    },timeout)
}
export const connect = async () : Promise<void> =>{
    if(mongoose.connections[0].readyState){
        return
    }
    try{
        const url = process.env.MONGO ?? 'default'
        await mongoose.connect(url);
        console.log('connected to db')
        
    }
    catch{
        throw new Error('Connect error')
    }
    finally{
        getData(60000)
    }
}

//86400000 - 1 день