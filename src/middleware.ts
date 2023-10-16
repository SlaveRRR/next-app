import { withAuth } from "next-auth/middleware";

const adminPaths = ['/article/delete','/article/edit','/article/create','/moderate']

export default withAuth({
    callbacks:{
        authorized: ({req,token}) => {
            if(adminPaths.includes(req.nextUrl.pathname)){
                return token?.role === "admin"
            }
            return Boolean(token)
        }
    }
})

export const config = { matcher:['/article/:path*','/article'] }