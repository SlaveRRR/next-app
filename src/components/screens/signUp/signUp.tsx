"use client"
import { FC } from "react";
import cn from 'classnames'



import { SubmitHandler, useForm } from "react-hook-form";

import styles from './signUp.module.scss';
import { useRouter } from "next/navigation";

type FormData = {
    name: string,
    email: string,
    password: string,
    emailVerifiedAt: string,
    createdAt: string,
    rememberToken: string,
    updatedAt: string,
    role:'user'
}

const SignUp: FC = () => {
     const {replace} = useRouter()
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
        mode: "onChange",
        shouldFocusError: true,
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers:{
                    'Content-type':'apllication/json',
                    'Accept':'apllication/json'
                },
                body: JSON.stringify(data)
            })

            if(res.ok){
                replace('/auth/signin')
                return
            }
        } catch (error) {
            console.log(error)
        }
        

    }
    return (
        <div className="form-container container">
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>

                <label className="form__item-label" htmlFor="username">Name</label>
                <input {...register('name', {
                    required: 'Field is required!'
                })} className={cn(styles["form__item-input"], styles["form__item-input--text"])} type="text" id="username" placeholder="Enter your name" />
                <p className="error-text">{errors?.name?.message}</p>
                <label className="form__item-label" htmlFor="email">Email address</label>
                <input {...register('email', {
                    required: 'Field is required!',
                    pattern: {
                        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                        message: 'Please, enter valid email'
                    }
                })} className={cn(styles["form__item-input"], styles["form__item-input--text"])} type="email" id="email" placeholder="Enter email" />
                <p className="error-text">{errors?.email?.message}</p>
                <label className="form__item-label" htmlFor="pass">Password</label>
                <input {...register('password', {
                    required: 'Field is required!',
                    minLength: {
                        value: 6,
                        message: 'Minimum 6 characters'
                    }
                })} className={cn(styles["form__item-input"], styles["form__item-input--text"])} type="password" id="pass" placeholder="Enter password" />
                <p className="error-text">{errors?.password?.message}</p>
                <input type="submit" value="Send data" />

            </form>
        </div>
    )
}

export default SignUp;

{/* <div className="form-container container">
                <form className={styles["form"]} method="POST">
                    <label className="form__item-label"{styles["form__item-label"]} htmlFor="usernmame">Name</label>
                    <input className={styles["form__item-input"]} type="text" id="username" placeholder="Enter your name" />
                    <label className={styles["form__item-label"]} htmlFor="email">Email address</label>
                    <input className={styles["form__item-label"]} type="email" id="email" placeholder="Enter email" />
                    <label className={styles["form__item-label"]} htmlFor="password">Password</label>
                    <input className={styles["form__item-input"]} type="password" id="password" placeholder="Enter password" />
                    <label className={styles["form__item-label"]} htmlFor="check">Agree with process sdf</label>
                    <input className={styles["form__item-input"]} id="check" type="checkbox" />
                </form>
            </div> */}

