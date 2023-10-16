import React,{ FC,useState } from "react"
import cn from "classnames"

import styles from './burger.module.scss'

type Props = {
    color:string,
    isActive:boolean,
    onClick():void
}

const Burger: FC<Props> = ({color,isActive,onClick}) => {
  
    return (
        <button onClick={() => onClick()} aria-label="open menu" aria-expanded="false" aria-controls="nav" className={cn(styles["burger-btn"])}>
            <span className="visuallyhidden">open menu burger</span>
            <svg className={cn(styles["burger-container"],{[styles['burger-container--active']] : isActive })} viewBox="0 0 35 25" fill={color}
                xmlns="http://www.w3.org/2000/svg">
                <rect className={styles["burger-container__item"]} width="35" height="3" rx="1.5"/>
                <rect className={styles["burger-container__item"]} y="11" width="35" height="3" rx="1.5" />
                <rect className={styles["burger-container__item"]} y="22" width="35" height="3" rx="1.5"/>
            </svg>
        </button>
    )

}

export default React.memo(Burger) 