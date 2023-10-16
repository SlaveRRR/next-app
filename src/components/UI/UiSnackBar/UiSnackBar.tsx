'use client';
import React, { FC, useContext } from 'react'
import styles from './UiSnackBar.module.scss'
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { ctx } from '@/context/context';




const UiSnackBar: FC = () => {

    const {snackbar:[snackbarState,setSnackbar]} = useContext(ctx);

    const {active,isError,message} = snackbarState

    return (
        <>
        <CSSTransition
            in={active}
            timeout={1000}
            unmountOnExit
            classNames={{
                enter:styles["snackbar-container--enter"],
                enterActive: styles["snackbar-container--enterActive"],
                enterDone: styles["snackbar-container--enterDone"],
                exit:styles["snackbar-container--exit"],
                exitActive: styles["snackbar-container--exitActive"],
                exitDone: styles["snackbar-container--exitDone"]
              }}
        >
            <div className={cn(styles['snackbar-container'], {
                [styles['snackbar-container--negative']]: isError,
                [styles['snackbar-container--positive']]: !isError,
            })}>
                <p className="snackbar-message">{message}</p>
            </div>
        </CSSTransition>
        </>

    )


}

export default UiSnackBar