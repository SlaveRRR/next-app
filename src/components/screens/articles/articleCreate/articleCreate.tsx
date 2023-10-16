"use client";
import React, { FC } from 'react'
import { useForm,SubmitHandler } from 'react-hook-form';
import { IArticle } from '@/types/article'

import cn from 'classnames';
import styles from './articleCreate.module.scss';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/socketProvider';





const ArticleCreate: FC = () => {
    const {replace} = useRouter()
    const {register, handleSubmit, formState: {errors}, reset } = useForm<IArticle>({
        mode:"onChange",
        shouldFocusError:true,
    });
    
    const {socket} = useSocket();
   
    const onSubmit : SubmitHandler<IArticle> = async (data) => {
        
        try {
            const res = await fetch(`/api/article/create`,{
                method:'POST',
                body:JSON.stringify(data)
            })
            
            socket.emit('article-creation',data)
            replace('/article')
        } catch (error) {
            console.log(error)
        }
        finally{
            alert('article was created')
        }
        
    } 
    return (
        <section className='article-create-section'>
            <div className={cn(styles['article__container'],'container')}>
                <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="datePublic">Date public</label>
                    <input className={styles['input']}
                     {...register('datePublic',{
                        required:'Date public is required!'
                    })} type="date"  id="datePublic" />
                    <p className='error-text' >{errors?.datePublic?.message}</p>
                    <label htmlFor="title">Title</label>
                    <input {...register('title',{
                        required:'Title is required!'
                    })} type="text" id="title" />
                    <p className='error-text'>{errors?.title?.message}</p>
                    <label htmlFor="shortdesc">Short description</label>
                    <input 
                    {...register('shortDesc',{
                    })} type="text"  id="shortdesc"  />
                    <label htmlFor="description">Description</label>
                    <input {...register('desc',{
                        required:'Description is required!'
                    })} type="text"  id="description"  />
                     <p className='error-text'>{errors?.desc?.message}</p>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </section>

    )
}

export default ArticleCreate;