"use client"
import { FC } from "react";
import cn from 'classnames'



import { SubmitHandler, useForm } from "react-hook-form";

import styles from './signIn.module.scss';
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";


type FormData = {
    email: string,
    password: string,
}

const SignIn: FC = () => {
    const {replace} = useRouter()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        mode: "onChange",
        shouldFocusError: true
    });
 
    const onSubmit: SubmitHandler<FormData> = async (data) => {

        try {
            const res = await signIn('credentials', {
                ...data,
                redirect:false
            })

            if (res?.ok){
                alert('you signin');
                replace('/');
                return
            }
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div className="form-container container">
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>

                <label className="form__item-label" htmlFor="email">Email address</label>
                <input {...register('email', {
                    required: 'Field is required!',
                    pattern: {
                        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                        message: 'Please, enter valid email'
                    }
                })} className={cn(styles["form__item-input"], styles["form__item-input--text"])} type="email" id="email" placeholder="Enter email" />
                <p>{errors?.email?.message}</p>
                <label className="form__item-label" htmlFor="pass">Password</label>
                <input {...register('password', {
                    required: 'Field is required',
                    minLength: {
                        value: 6,
                        message: 'Minimum 6 characters'
                    }
                })} className={cn(styles["form__item-input"], styles["form__item-input--text"])} type="password" id="pass" placeholder="Enter password" />
                <p>{errors?.password?.message}</p>
                <input type="submit" value="Signin" />

            </form>
        </div>
    )
}

export default SignIn;


