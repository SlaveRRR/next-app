"use client"
import Link from 'next/link';
import Image from 'next/image';
import {FC,useContext} from 'react';
import { useSession} from 'next-auth/react'
import cn from 'classnames'

import { ctx } from '@/context/context';
import {Burger} from '../../UI/components'
import styles from './header.module.scss';
import { usePathname } from 'next/navigation';




const navItems = {
    '/':'Home',
    '/about':'About us',
    '/contacts':'Contacts',
    '/article':'Articles',
    '/article/create':'Create Article',
    '/auth/signup':'SignUp'
}

const Header : FC = () =>{
    const path = usePathname()
    const {burger:[isActive,setActive]} = useContext(ctx)
    const {data:user} = useSession();
   
    return(
        <header className={styles['header']}>
            <div className={styles["header__container"]}>
                <Image src={'/next.svg'} width={50} height={50} alt='logo'/>
                <nav onClick={() => isActive ? setActive(!isActive) : false} className={cn(styles["header__nav"],{[styles["header__nav--active"]]: isActive })}>
                    {...Object.entries(navItems).map(([url,text],i) => <Link className={cn(styles['nav__item'],{
                         [styles['nav__item--active']]:path === url
                    })}  replace={true} key={i}  href={url}>{text}</Link>)}


                    <Link className={cn(styles['nav__item'],{
                        [styles['nav__item--active']]:['/auth/signin','/auth/signout'].includes(path as string)
                    })} href={!user ? '/auth/signin' : '/auth/signout'}>{!user ? 'Signin' : 'Signout'}</Link>
               
                </nav>
               
                <Burger color="#6f6969" isActive={isActive} onClick={() => setActive(!isActive)}/>
            </div>
           
        </header>
    ) 
   
}  

export default Header;