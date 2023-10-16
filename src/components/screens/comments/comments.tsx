import React, { FC } from 'react'
import Comment from './comment/comment'
import { IComment } from '@/types/comment'

import styles from './comments.module.scss'

type props = {
    comments: IComment[]

}

const Comments: FC<props> = ({ comments }) => {
    return (
        comments.length > 0 ? (
            <div className={styles['comments-container']}>
                {comments.map((el) => <Comment key={el.id} {...el}/>)}
            </div>
        )
        :
        <p>Comments don`t exist</p>
    
  )
}

export default React.memo(Comments);