"use client";

import React,{ createContext, useEffect, useContext, useState ,FC,useMemo} from "react";

import {io as ClientIO} from 'socket.io-client';
import { ctx } from "./context";

type SocketContextType = {
    socket: any | null,
    isConnected:boolean,
    
}

const SocketContext = createContext<SocketContextType>({
    socket:null,
    isConnected:false
})

export const useSocket = () =>{
   
        return useContext(SocketContext)
    
}

type Props = {
    children:React.ReactNode
}

export const SocketProvider : FC<Props> = ({children}) =>{

    const [socket,setSocket] = useState(null);

    const [isConnected,setIsConnected] = useState(false);
    
    const { snackbar: [snackbarState, setSnackbar] } = useContext(ctx)
    
    useEffect(() =>{
        const socketInstance =  new (ClientIO as any)(process.env.NEXTAUTH_URL!, {
            path:'/api/socket/io',
            addTrailingSlash:false
        })

        socketInstance.on("connect", () =>{
            setIsConnected(true)
        })

        socketInstance.on("disconnect", () =>{
            setIsConnected(false)
        })

        

        socketInstance.on('article-created', (msg: any) => {
            console.log('received')
            setSnackbar({ ...snackbarState, active: true, message: `${msg.title} was created`, isError: false })

            setTimeout(() => {
                setSnackbar({ ...snackbarState, active: false, message: '', isError: false })
            }, 1500)

        })


        socketInstance.on('comment-created', (msg: any) => {
            console.log('worked ')
            setSnackbar({ ...snackbarState, active: true, message: `${msg.user.name} create new comment`, isError: false })

            setTimeout(() => {
                setSnackbar({ ...snackbarState, active: false, message: '', isError: false })
            }, 1500)

        })


        setSocket(socketInstance)

        return () =>{
            socketInstance.disconnect()
        }
    },[])

    return(
        <SocketContext.Provider value={
            {socket,isConnected}
            }>
            {children}
        </SocketContext.Provider>
    )
}