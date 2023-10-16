'use client';
import { SnackBar } from '@/components/UI/components';
import { ctx } from '@/context/context';
import { useSocket } from '@/context/socketProvider';
import React, { FC,useContext,useEffect } from 'react'


const UIContainer : FC = () => {
    
    const {socket,isConnected} = useSocket();
    
    

    const {snackbar:[snackbarState,setSnackbar]} = useContext(ctx)


    
    useEffect(() => {

        if(isConnected){
            
            socket.on('article-created',(msg : any) =>{
                
                setSnackbar({...snackbarState, active:true, message:`article ${msg.title} was created`, isError:false})
            
            setTimeout(() =>{
                setSnackbar({...snackbarState, active:false, message:'', isError:false})
            },1500)
               
            })

            socket.on('comment-created',(msg : any) =>{
                
                setSnackbar({...snackbarState, active:true, message:`${msg.user.name} create new comment`, isError:false})
            
            setTimeout(() =>{
                setSnackbar({...snackbarState, active:false, message:'', isError:false})
            },1500)
               
            })
        }
        
    }, [isConnected])
    
  return (
    <div className="ui-container">
     <SnackBar/>
    
  </div>
  )
}
export default UIContainer