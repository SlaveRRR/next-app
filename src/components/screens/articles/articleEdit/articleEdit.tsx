"use client";
import React, { FC } from 'react'
import { useForm,SubmitHandler } from 'react-hook-form';
import { IArticle } from '@/types/article'

import cn from 'classnames';
import styles from './articleEdit.module.scss';
import { useRouter } from 'next/navigation';




const ArticleEdit: FC<IArticle> = ({ desc, shortDesc, title, id,datePublic }) => {
    const {replace} = useRouter()
    const {register, handleSubmit, formState: {errors}, reset } = useForm<IArticle>({
        mode:"onChange",
        shouldFocusError:true,
        defaultValues:{
            id:id
        }
    });
    const getStr = (str : string) : string => str.split('.').reverse().join('-')
   
    const onSubmit : SubmitHandler<IArticle> = async (data) => {
        console.log(data)
        
        try {
            const res = await fetch(`/api/article/${id}`,{
                method:'PUT',
                body:JSON.stringify(data)
            })
            console.log(res)
            if(res.ok){
                replace(`/article/${id}`)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            alert('article was updated')
        }
        
    } 
    return (
        <section className='article-edit-section'>
            <div className={cn(styles['article__container'],'container')}>
                <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="datePublic">Date public</label>
                    <input {...register('datePublic',{
                        value:getStr(datePublic),
                        required:'Date public is required!'
                    })} type="date"  id="datePublic" />
                    <p className='error-text'>{errors?.datePublic?.message}</p>
                    <label htmlFor="title">Title</label>
                    <input {...register('title',{
                        value:title,
                        required:'Title is required!'
                    })} type="text" id="title" />
                    <p className='error-text'>{errors?.title?.message}</p>
                    <label htmlFor="shortdesc">Short description</label>
                    <input {...register('shortDesc',{
                        value:shortDesc
                    })} type="text"  id="shortdesc"  />
                    <label htmlFor="description">Description</label>
                    <input {...register('desc',{
                        value:desc,
                        required:'Description is required!'
                    })} type="text"  id="description"  />
                     <p className='error-text'>{errors?.desc?.message}</p>
                    <input type="submit" value="Save" />
                </form>
            </div>
        </section>

    )
}

export default ArticleEdit;