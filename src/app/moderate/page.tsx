import Moderate from "@/components/screens/moderate/moderate"


const getData = async (id : number) =>{
   
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/comment/${id}`);
    return res.json();
}

const ModeratePage  = async ({searchParams} : { searchParams:{ [key:string] : string | string[] | undefined }}) =>{
    const comment = await getData(Number(searchParams['id']));
    console.log(comment)
    return <Moderate comment={comment}/>
}

export default ModeratePage
