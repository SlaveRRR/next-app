import Image from 'next/image'
import styles from './page.module.css'
import { NextPage } from 'next'
import Home from '../components/screens/home/home'


const getData =  async () =>{
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/data`);
    if(!res.ok){
      throw new Error('Internal error')
    }
    return res.json()
  } catch (error) {
    console.log(error);
  }
  

  
}

const HomePage  = async () =>{
  const data = await getData();
  return <Home data={data} />
}

export default HomePage;
// export default function Home() {
//   return (
//    <div>Home component</div>
//   )
// }
