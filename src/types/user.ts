
export enum Roles{
    admin = 'admin',
    user = 'user'
}

export interface IUser {
    id:number,
    name:string,
    email:string,
    password:string,
    emailVerifiedAt:string,
    createdAt:string,
    rememberToken:string,
    updatedAt:string,
    role:Roles
}