"use client"
import React,{FC} from 'react'
import { IComment } from '@/types/comment'
import Comment from '../comments/comment/comment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ctx } from '@/context/context'
import { useSocket } from '@/context/socketProvider'

type Props = {
    comment:IComment
}

const Moderate : FC<Props> = ({comment}) => {
    const {replace} = useRouter();

    const {socket} = useSocket()

    const acceptComment = async () =>{
        try {
            const res = await fetch(`/api/comment/${comment.id}`,{
                method:'PUT'
            })
            if(!res.ok){
                throw new Error('Server error!')
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            alert('Comment was moderated');
            socket.emit('comment-creation',comment)
            replace('/')
        }
    }

    const rejectComment = async () =>{
        try {
            const res = await fetch(`/api/comment/${comment.id}`,{
                method:'DELETE'
            })
            if(!res.ok){
                throw new Error('Server error!')
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            alert('Comment was moderated');
            replace('/')
        }
    }
  return (
    <>
        <div>moderate</div>
        <Comment {...comment}/>
        <button onClick={() => acceptComment()}>Accept</button>
        <button onClick={() => rejectComment()}>Reject</button>
    </>
    
    
  )
}

export default Moderate;