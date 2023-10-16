import mongoose, { Schema, model } from 'mongoose';

import { IArticle } from '@/types/article';


const articleSchema = new Schema<IArticle>({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    shortDesc: String,
    desc: {
        type: String,
        required: true
    },
    datePublic:{
        required: true,
        type:String,
    },
    views:{
        type:Number,
        default:0
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]

});


export default mongoose.models.Article ?? model<IArticle>('Article', articleSchema);











