"use client"
import React, { FC } from 'react'
import { IComment } from '@/types/comment'
import Comment from '../comments/comment/comment'

import { useRouter } from 'next/navigation'

import { useSocket } from '@/context/socketProvider'
import cn from 'classnames';


import styles from './moderate.module.scss'


type Props = {
    comment: IComment
}

const Moderate: FC<Props> = ({ comment }) => {
    const { replace } = useRouter();

    const { socket } = useSocket()

    const acceptComment = async () => {
        try {
            const res = await fetch(`/api/comment/${comment.id}`, {
                method: 'PUT'
            })
            if (!res.ok) {
                throw new Error('Server error!')
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            socket.emit('comment-creation', comment)
            alert('Comment was moderated');
            
            replace('/')
        }
    }

    const rejectComment = async () => {
        try {
            const res = await fetch(`/api/comment/${comment.id}`, {
                method: 'DELETE'
            })
            if (!res.ok) {
                throw new Error('Server error!')
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            alert('Comment was moderated');
            replace('/')
        }
    }
    return (
        <section className='moderate-section'>
            <div className={cn(styles["moderate"], "container")}>
                <h2>Moderate</h2>
                <Comment {...comment} />
                <div className={styles["moderate__btns"]}>
                    <button onClick={() => acceptComment()}>Accept</button>
                    <button onClick={() => rejectComment()}>Reject</button>
                </div>

            </div>
        </section>





    )
}

export default Moderate;