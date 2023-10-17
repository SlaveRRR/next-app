'use client';
import React, { FC } from 'react'

import { IArticle } from '@/types/article'
import Article from './article/article'

import styles from './articles.module.scss'

import cn from 'classnames';
import Pagination from '@/components/UI/Pagination/pagination';





type Props = {
    articles: IArticle[];
    page:number;
    limit:number;
    max:number;
}

const Articles: FC<Props> = ({ articles, page, limit, max }) => {
    
    
    
   

    return (
        <div className={cn(styles['articles'],'container')}>
            <div className={styles['articles__table']}>
                <p className={styles['articles__date']} >Date</p>
                <p className={styles['articles__title']} >Title</p>
                <p className={styles['articles__shortdesc']} >ShortDesc</p>
            </div>
            
            {
                articles.length > 0 ? articles.map(v => <Article key={v.id} {...v} />) : <p>Articles don`t exist</p>
            }
            {
                articles.length >= 10 && (
                    <Pagination page={page} max={max} />
                )
            }
           
        </div>
    )
}

export default Articles