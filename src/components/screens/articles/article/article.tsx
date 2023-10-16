import React,{FC} from 'react'

import { IArticle } from '@/types/article'
import cn from 'classnames';
import styles from './article.module.scss';
import Link from 'next/link';



const Article : FC<IArticle> = ({datePublic,desc,shortDesc,title,id}) => {
  return (
    <div className={cn(styles['articles__item'],'item')}>
        <time className={cn(styles['item__date'])}>{datePublic}</time>
        <Link href={`article/${id}`} className='item__title'>{title}</Link>
        <p className='item__shortdesc'>{shortDesc}</p>
    </div>  
  )
}

export default React.memo(Article);