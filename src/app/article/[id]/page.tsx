

import ArticleOne from "@/components/screens/articles/articleOne/articleOne";
import { IArticle } from "@/types/article";



const getData = async (id: string): Promise<IArticle> => {

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/article/${id}`, {
        next: { revalidate: 10 }
    });
    if (res.status != 200) {
        throw new Error('Server error')
    }

    return res.json()

}

const ArticlePage = async ({ params }: { params: { id: string } }) => {
    const article = await getData(params.id)

    return <ArticleOne {...article} />
}

export default ArticlePage;