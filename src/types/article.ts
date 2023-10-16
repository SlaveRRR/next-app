import { IComment } from "./comment";

export interface IArticle {
    id:number,
    title: string,
    shortDesc: string,
    desc: string,
    datePublic: string,
    views:number,
    comments:IComment[],
}