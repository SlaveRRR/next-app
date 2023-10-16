import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User';
import { connect } from '@/services/db';
import bcrypt from 'bcrypt'



import {
    type DefaultSession,
    type DefaultUser,
    
} from "next-auth";
import {
    type DefaultJWT
} from "next-auth/jwt";
import { Roles } from '@/types/user';

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            role:Roles,
            id:number,
        };
    }
    interface User extends DefaultUser {
        role: Roles;
        id:number;
    }
    
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
      role: Roles;
      id:number;
    }
  }


export const options: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }
                await connect();
                if (credentials !== undefined) {
                    const user = await User.findOne({ email: email });
                    if (!user) {
                        throw new Error('Invalid email!')
                    }
                    const isPasswordMatched = await bcrypt.compare(password, user.password);

                    if (!isPasswordMatched) {
                        throw new Error('Invalid password!')
                    }
                    return user
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {

                token.role = user.role;
                token.id = user.id as number
            }
            return token
        },
        async session({session,token}){
            session.user.role = token.role;
            session.user.id = token.id;
            return session
        }
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}