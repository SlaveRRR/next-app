
import cn from 'classnames';
import React, { FC } from 'react';
import {useForm,SubmitHandler} from 'react-hook-form';

import styles from './sendComment.module.scss'
import { useRouter } from 'next/navigation';

type FormData = {
    message: string,
    articleId: number,
    userId: number
}

type Props = {
    id:number;
    userId:number;
    mixClass:string[];
}



const SendComment: FC<Props> = ({ id,userId, mixClass }) => {
    const {refresh} =  useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm<FormData>({
        mode: "onSubmit",
        shouldFocusError: true,
        defaultValues: {
            articleId: id,
            userId: userId
        }
    })

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        try {
            const res = await fetch(`/api/comment`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        finally {
            alert('comment was created')
        }

    }

    return (
        <form className={cn(styles['sendComment'],...mixClass)} onSubmit={handleSubmit(onSubmit)}>
            <input onKeyDown={e => e.key === 'Enter' ? handleSubmit(onSubmit) : false} className={styles['sendComment__text-input']} {...register('message', {
                required: 'Message is required'
            })} type="text" />
            <p className='error-text'>{errors?.message?.message}</p>
            <input className={styles['sendComment__send-btn']}  type="submit" value="send" />
        </form>
    )
}

export default SendComment