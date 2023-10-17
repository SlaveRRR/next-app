'use client';
import React, { FC } from 'react'
import Comment from './comment/comment'
import { IComment } from '@/types/comment'

import styles from './comments.module.scss'
import { useSession } from 'next-auth/react';

type props = {
    comments: IComment[]

}

const Comments: FC<props> = ({ comments }) => {
    const {data:user} =  useSession();
    const newComments = comments.filter(el => el.isVerified);
    const userComments = comments.filter(el => !el.isVerified && user?.user.id == el.user.id);
    return (
        comments.length > 0 ? (
            <div className={styles['comments-container']}>
                {newComments.map((el) => <Comment key={el.id} {...el}/>)}
                {userComments.length > 0 && userComments.map((el) => <Comment key={el.id} {...el}/>)}
            </div>
        )
        :
        <p>Comments don`t exist</p>
    
  )
}

export default React.memo(Comments);