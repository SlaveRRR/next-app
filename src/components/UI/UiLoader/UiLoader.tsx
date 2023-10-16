import React, { FC } from 'react'

import styles from './UiLoader.module.scss'


const UiLoader : FC = () => {
    return (
        <div className={styles["loader"]}></div>
    )


}

export default UiLoader