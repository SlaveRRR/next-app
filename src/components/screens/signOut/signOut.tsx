'use client';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, {FC} from 'react'

import styles from './signOut.module.scss'
import cn from 'classnames';

const SignOut : FC = () => {
    const {replace} = useRouter()
    const handleClick = async () =>{
        await signOut({
            redirect:false
        });
        replace('/auth/signin');
        return
    }
    return (
        <section className='signout-section'>
            <div className={cn(styles['signout__container'],"container")}>
            <button className={styles['signout']} onClick={() => handleClick()}>Signout</button>
        </div>
        </section>
        

    ) 
}

export default SignOut