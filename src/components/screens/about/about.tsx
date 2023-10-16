import { FC } from "react"

import styles from './adbout.module.scss'
import cn from "classnames"


const About : FC = () =>{
    return <div className={cn(styles['about'],"container")}><p>about page. Next app blog</p></div>
}

export default About;