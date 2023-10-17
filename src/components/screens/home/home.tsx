'use client'
import { FC } from "react";
import { useSession } from 'next-auth/react'
import Image from "next/image";
import cn from "classnames";
import styles from './home.module.scss'



interface ImageGallery {
    date: string,
    id: number,
    title: string,
    url: string,
}



type Props = {
    data:ImageGallery[]
}

const Home: FC<Props> = ({data}) => {
    const { data: user , status} = useSession();
   
    return <div className={cn(styles["gallery-container"],"container")}>
        
        {status == 'loading' ? <p>Loading...</p> :  <p>You signin as {user?.user?.name}</p>}
       
        <div className={styles["gallery"]}>
        {data.map(({ title,id,date,url }) => (
            <div key={id} className={styles["gallery__item"]}>
                    <time className={styles['gallery__date']} >{date}</time>
                    <p className={styles['gallery__text']}>{title}</p>
                    <Image src={url} style={{
                        objectFit:'cover'
                    }} alt="image" width={100} height={100}/>

            </div>
           
        ))}
        </div>
        
    </div>
}

export default Home;