import Article from '@/models/Article'
import Comment from '@/models/Comment'
import User from '@/models/User'
import mongoose from 'mongoose'
import { mailer } from './mailer'

const getData = (timeout:number) =>{
    setInterval(async () =>{
        const data = await Article.find().populate({
            path: 'comments',
            model:Comment,
            populate: { path: 'user', model:User  }
        })
        let text:string = '';
        data.forEach(el =>{
            text+=`Article ${el.title}, comments ${el.comments.length}`
        });
          return mailer({
        from:process.env.MAIL as string,
        subject:'Statistics for day',
        text:text,
        to:'vyacheslav1410@yandex.ru'
    })
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
        // getData(86400000)
    }
}

//86400000 - 1 день