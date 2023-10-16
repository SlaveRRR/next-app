import { IUser } from "./user";

export interface IComment {
    id:number,
    message:string,
    createdAt: string,
    isVerified:boolean,
    user:IUser
}