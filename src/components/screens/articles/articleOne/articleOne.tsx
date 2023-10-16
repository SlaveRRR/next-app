"use client";
import React, { FC, useEffect, useState } from 'react'
import Comments from '../../comments/comments';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IArticle } from '@/types/article'

import cn from 'classnames';

import { useSession } from 'next-auth/react';

import { Roles } from '@/types/user';

import { PageViews } from '@/components/UI/components';

import styles from './articleOne.module.scss';
import SendComment from '../../sendComment/sendComment';





const ArticleOne: FC<IArticle> = ({ datePublic,desc, shortDesc, title, id, comments, views }) => {

    const { push } = useRouter();
    const { data: user } = useSession();
    const [openComments, setOpen] = useState(false);

   

    const handleClick = async () => {
        try {
            const res = await fetch(`/api/article/${id}`, {
                method: 'DELETE'
            })
        
            if (res.ok) {
                push('/article')
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            alert('article was deleted')
        }
    }

    useEffect(() => {
        const  fromSS = sessionStorage.getItem("viewed") 

        if (!fromSS) {
          const timer = setTimeout(async () => {
            const data = {datePublic,desc, shortDesc, title, id, comments, views}
            data['views']+=1
            let res =  await fetch(`/api/article/${id}`,{
                method:'PUT',
                body:JSON.stringify(data)
            })
            sessionStorage.setItem("viewed",'1');
          }, 2000); 

          return () => clearTimeout(timer);
        }
       
      }, []);

    return (
        <section className='article-section'>
            <div className={cn(styles['article__container'], 'container')}>
                <div className={styles.article}>
                    <PageViews mixClass={[styles['article__views']]} views={views} />
                    <p className={styles['article__title']}>{title}</p>
                    <p className={styles['article__shortdesc']}>{shortDesc}</p>
                    <p className={styles['article__desc']}>{desc}</p>
                    <button className={styles['article__show-btn']} onClick={() => setOpen(!openComments)}>{!openComments ? 'show comments' : 'hide comments'}</button>
                    {user?.user.role === Roles.admin && (
                        <div  className={styles["article__links"]}>
                            <Link href={`/article/${id}/edit`}>EDIT</Link>
                            <button type='button' onClick={() => handleClick()}>Delete</button>
                        </div>
                    )}
                    {openComments && (
                        <div className={styles['article__comments']}>
                           <SendComment mixClass={[styles['article__form']]} id={id} userId={user?.user.id as number} />
                            <Comments comments={comments} />
                        </div>

                    )}


                </div>


            </div>
        </section>

    )
}

export default ArticleOne