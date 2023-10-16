import React,{FC} from 'react'
import { IComment } from '@/types/comment'

import styles from './comment.module.scss'

const Comment : FC<IComment> = ({isVerified,message,user,createdAt}) => {
  
  return (
    <div className={styles["comment"]}>
        {!isVerified && <span className={styles['comment__verify']}>На модерации( комментарий виден только вам)</span>}
        <p className={styles['comment__author']}>{user.name}</p>
        <p className={styles['comment__message']}>{message}</p>
        <time className={styles['comment__date']} dateTime={createdAt}>{createdAt}</time>
    </div>
  )
}

export default React.memo(Comment)