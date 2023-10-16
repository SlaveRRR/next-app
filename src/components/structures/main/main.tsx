"use client"
import React,{FC,useContext} from 'react'
import { ctx } from '@/context/context';

import styles from './main.module.scss';


type props = {
     children: React.ReactNode
}

const Main : FC<props> = ({children}) => {
    const {burger:[isActive,setActive]} = useContext(ctx);
    
  return (
    <main onClick={() => isActive ? setActive(!isActive) : false} className={styles['main']}>
        {children}
    </main>
  )
}

export default Main;