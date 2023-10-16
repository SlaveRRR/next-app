
import Articles from "@/components/screens/articles/articles";
import { IArticle } from "@/types/article";





const getData = async ({page,limit} : {page:number,limit:number}) : Promise<IArticle[]> =>{
   
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/article?page=${page}&limit=${limit}`,{
        cache:'no-store'
    });
    if(res.status != 200){
        throw new Error('Server error')
    }

    return res.json()

} 

const ArticlesPage = async ({searchParams} : { searchParams:{ [key:string] : string | string[] | undefined }}) =>{
   
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10
    const articles = await getData({limit,page})
    return <Articles articles={articles} page={page} limit={limit} />
}

export default ArticlesPage;